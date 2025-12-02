module.exports = function roleCheck(requiredRole) {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
