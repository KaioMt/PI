const express = require("express");
const ctlrUsuario = express.Router();

const Usuario = require("./Database/usuario");


router.get("/cadastro", (req,res) => {
  res.render("Cadastro/cadastro")
})


ctlrUsuario.get("/login", (req,res) => {
  res.render("login")
})

ctlrUsuario.post("/login", async (req, res) => {
        const { email, senha } = req.body;
      
        try {
          const usuario = await Usuario.findOne({ where: { email, senha } });
      
          if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
          }
          else{
          return res.json({ mensagem: 'Login realizado com sucesso' });
        }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ mensagem: 'Erro no servidor' });
        }
});

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