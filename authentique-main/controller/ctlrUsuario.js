const express = require("express");
const jwt = require("jsonwebtoken"); 
const ctlrUsuario = express.Router();

const Usuario = require("../Database/usuario");

ctlrUsuario.get("/cadastro", (req,res) => {
  res.render("Cadastro/cadastro")
})

ctlrUsuario.get("/logout", (req,res) => {
  res.clearCookie("token").redirect("/usuario/login")
})


ctlrUsuario.get("/login", (req,res) => {
  res.render("login")
})

const JWTScret = "123456789"

ctlrUsuario.post("/login", async (req, res) => {
        let { email, senha } = req.body;

        if(email != undefined & senha != undefined){
        try {
          // let usuario = await Usuario.findOne({ where: { email, senha } });
          let usuario = email
      
          if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
          }
          else{

            const token = jwt.sign(
              { id: usuario.Id, nome: usuario.Nome, email: usuario.Email, empresa: usuario.Empresa_Id },
              JWTScret,
              { expiresIn: '12h' }
            );
          res.cookie('token', token, {maxAge: 43200000, httpOnly: true}) 
          .sendStatus(200)
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ mensagem: 'Erro no servidor' });
        }
      }else{
        if (email == undefined){
          return res.status(400).json({ mensagem: 'Email é inválido' });
        } else{
          return res.status(400).json({ mensagem: 'Senha é inválido' });
        }
      }
})


ctlrUsuario.post("/", (req, res) => {

  let {nome, email, senha} = req.body;
  Usuario.create({
      Nome: nome,
      Email: email,
      Senha: senha
  })

  res.sendStatus(200);

})

// ctlrUsuario.put("/", (req, res) => {

// })

// ctlrUsuario.get("/", (req, res) => {

// })

// ctlrUsuario.delete("/", (req, res) => {

// })

module.exports = ctlrUsuario