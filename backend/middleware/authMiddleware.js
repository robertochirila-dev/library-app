const jwt = require("jsonwebtoken");

const authMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      // Get token from header and validate format
      const authHeader = req.header("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ 
          success: false, 
          message: "Authorization header missing or invalid format" 
        });
      }

      const token = authHeader.replace("Bearer ", "");
      
      // Verify token using environment variable secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
      // Attach user info to request
      req.user = decoded;

      // Handle role-based access (support for multiple roles)
      if (roles) {
        const userRoles = Array.isArray(req.user.roles) 
          ? req.user.roles 
          : [req.user.role];
          
        const hasRequiredRole = Array.isArray(roles)
          ? roles.some(role => userRoles.includes(role))
          : userRoles.includes(roles);

        if (!hasRequiredRole) {
          return res.status(403).json({ 
            success: false,
            message: "Insufficient permissions" 
          });
        }
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ 
          success: false, 
          message: "Token expired" 
        });
      }
      
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token" 
      });
    }
  };
};

module.exports = authMiddleware;