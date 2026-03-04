const express = require("express");
const userCotroller = require("../controllers/user.controller");
const passport = require("passport");
const fs = require("fs");
const userRouter = express.Router();
const path = require("path");
const Catalog = require("../models/products.model");
const isAuth = require("../middleware/isAuth");
const upload = require("../config/multer");
const adminAuth = require("../middleware/IsAdmin")

userRouter.post("/signup", userCotroller.signup);
userRouter.post("/verify", userCotroller.verify);
userRouter.post("/signin", userCotroller.signin);
userRouter.post("/logout", isAuth, userCotroller.logout);
userRouter.get("/getuser/:userId",isAuth,userCotroller.getUser);
// admin 
userRouter.get("/getAlluser",isAuth,adminAuth,userCotroller.getAllUser);
userRouter.get("/assignrole/:userId",isAuth,adminAuth,userCotroller.assignRole);
userRouter.get("/delete/:userId",isAuth,adminAuth,userCotroller.deleteUser);


userRouter.patch(
  "/updateUserdata/:userId",
  isAuth,
  upload.single("image"),
  userCotroller.updateUserdata
);

// userRouter.post("/post", async (req, res) => {
//   try {
//     const dbPath = path.join(__dirname, "..", "db.json");

//     const fileData = fs.readFileSync(dbPath, "utf-8");
//     console.log("File data:", fileData);
//     const catalogData = JSON.parse(fileData);
//     console.log("Catalog data:", catalogData);

//     if (!Array.isArray(catalogData)) {
//       return res
//         .status(400)
//         .json({ message: "Invalid data format in db.json" });
//     }
//     await Catalog.insertMany(catalogData);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to save catalog" });
//   }
// });

module.exports = userRouter;
