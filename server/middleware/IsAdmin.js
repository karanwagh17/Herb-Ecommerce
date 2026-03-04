function isAdmin(req, res, next) {
  const user = req.user;
  console.log("User in isAdmin middleware:", user); 
  if (!user.role) return res.status(403).json({ message: "Admin only" });
  next();
}

module.exports = isAdmin;