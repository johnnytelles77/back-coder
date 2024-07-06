import { Router } from "express"
import userDao from "../dao/mongoDao/user.dao.js"
import { createHash, isValidPassword } from "../utils/hasPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";
import  { userLoginValidator } from "../validators/userLogin.validator.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";


const router = Router();

router.post("/register", passport.authenticate("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "success", msg: "Usuario Creado" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno del servidor" });

  }
})


router.post("/login", passport.authenticate("login"), async (req, res) => {
  try {
    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});


router.get("/login", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
  session: false
}), async (req, res) => {
  try {
    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});


router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();

    res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});


router.post("/jwt", userLoginValidator, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userDao.getByEmail(email);
    if (!user || !isValidPassword(user, password)) return res.status(401).json({ status: "error", msg: "usuario o contraseña no válido" });

    const token = createToken(user);
  // Guardamos el token en una cookie
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ status: "success", payload: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});



/* router.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
  try {

    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
}); */

router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
  console.log('Cookies in request:', req.cookies); // Verifica las cookies en la solicitud
  try {
    return res.status(200).json({ status: 'success', payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Error', msg: 'Internal Server Error' });
  }
});






export default router; 