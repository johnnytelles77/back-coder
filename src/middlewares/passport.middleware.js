import { request, response } from "express";
import passport from "passport";

export const passportCall = (strategy) => {
  return async (req = request, res = response, next) => {
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() });
      console.error("Authentication error:", error);
      req.user = user;

      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  
  return async (req = request, res = response, next) => {

    if(!req.user) return res.status(401).json({status: "error", msg: "No autorizado"});
    if(req.user.role !== role) return res.status(403).json({status: "error", msg: "No tienes permiso"});
    
    next();
  }
}



/* export const passportCall = (strategy) => {
  return async (req = request, res = response, next) => {
    console.log("Starting passport authentication");
    console.log("Request cookies:", req.cookies); // Verifica las cookies de la solicitud

    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      if (error) {
        console.error("Authentication error:", error);
        return next(error);
      }

      console.log("Authentication info:", info);
      console.log("Authenticated user:", user);

      if (!user) {
        console.warn("No user found:", info);
        return res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    console.log("Checking authorization");
    console.log("User:", req.user);

    if (!req.user) {
      console.warn("No user found in request");
      return res.status(401).json({ status: "error", msg: "No autorizado" });
    }

    if (req.user.role !== role) {
      console.warn(`User does not have the required role: ${role}`);
      return res.status(403).json({ status: "error", msg: "No tienes permiso" });
    }

    next();
  };
};
 */



