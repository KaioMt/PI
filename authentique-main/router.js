const express = require("express");
const router = express.Router();
const authenticateToken = require("./authMiddleware");

const Doc = require("./controller/ctlrDocumento")
const User = require("./controller/ctlrUsuario")
const Empresa = require("./controller/ctlrEmpresa")

router.use("/documento",  Doc)
router.use("/usuario", User)
router.use("/empresa", Empresa)


router.get("/principal", authenticateToken,(req,res) => {
    res.render("index")
})


router.get("/recuperar", (req,res) => {
    res.render("recuperar_conta")
})


module.exports = router