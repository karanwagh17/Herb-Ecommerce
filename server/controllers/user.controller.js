const userModel = require("../models/userScema");
const generateOTPandToken = require("../utils/otp");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendmail");

const userCotroller = {
  signup: async (req, res) => {
    const { email, password, name, phone } = req.body;
    if (!email || !password || !name || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isExistUser = await userModel.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ message: "account is allready created" });
    }

    const { otp, token } = generateOTPandToken({ ...req.body }, "5m");

    try {
      const htmltemplate = await ejs.renderFile(
        __dirname + "/../views/emai.ejs",
        {
          name,
          otp,
        }
      );
      await sendMail(email, htmltemplate, "otp verification");
      res
        .cookie("verification_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })

        .status(200)
        .json({
          message: "otp send successfully",
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  verify: async (req, res) => {
    if (!req.cookies.verification_token) {
      console.log("verification token is not get");
    }
    try {
      const decoded = jwt.verify(
        req.cookies["verification_token"],
        process.env.JWT_SECRET_KEY
      );
      if (!decoded) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const { otp, userData } = decoded;

      if (otp !== req.body.otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      try {
        hashPassword = await bcrypt.hash(userData.password, 10);
        const user = await userModel.create({
          ...userData,
          password: hashPassword,
        });
        const htmltemplate = await ejs.renderFile(
          __dirname + "/../views/conform.ejs",
          {
            name: userData.name,
          }
        );

        await sendMail(userData.email, htmltemplate, " conformationn message");

        return res.status(200).json({ message: "accoun created" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  },
  signin: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "fill all the blanks" });
    }
    try {
      const isExistUser = await userModel.findOne({ email: req.body.email });

      if ( isExistUser.password === undefined) {
        return res.status(400).json({ message: "please create account first" });
      }
      const isMatch = await bcrypt.compare(
        req.body.password,
        isExistUser.password
      );
      if (!isMatch) {
        return res.status(400).json({ message: "invalid password" });
      }

      const { password, ...rest } = isExistUser._doc;
      const { token } = generateOTPandToken({ ...rest }, "30d");

      if (!token) {
        return res.status(400).json({ message: "invalid token" });
      }

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "login successfully", rest });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  updateUserdata: async (req, res) => {
    if (req.params.userId != req.user._id) {
      return res
        .status(400)
        .json({ message: "You are not authorized to update this user" });
    }

    try {
      let updatedUser;

      if (req.body.address) {
        updatedUser = await userModel.findByIdAndUpdate(
          req.params.userId,
          { $push: { address: req.body.address } },
          { new: true }
        );
      } else {
        const updateFields = { ...req.body };
        if (req.file) updateFields.image = req.file.originalname;

        updatedUser = await userModel.findByIdAndUpdate(
          req.params.userId,
          { $set: updateFields },
          { new: true }
        );
      }

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  },

  logout: () => {
    try {
      return res.clearCookie("access_token").status(200).json({
        message: "logout successfully",
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const user = await userModel
        .findById({ _id: userId })
        .select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },
  getAllUser: async (req, res) => {
    console.log(req.user.role)
    const { userId, role } = req.params;
    console.log(role)

    if (!req.user.role) {
      return res.status(404).json({ message: "you are not admin" });
    }
    try {
      const allUsers = await userModel.find({});
      return res.status(200).json(allUsers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  assignRole: async (req, res) => {
    const { userId } = req.params;  
    if (!req.user.role) {
      return res.status(404).json({ message: "you are not admin" });
    }
    try {      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        user.role = !user.role;
        await user.save();
        return res.status(200).json({ message: "Role assigned successfully" });
      }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
},
deleteUser: async (req, res) => {
  const { userId } = req.params;  
  if (!req.user.role) {
    return res.status(404).json({ message: "you are not admin" });
  }
  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
,
}
module.exports = userCotroller;
