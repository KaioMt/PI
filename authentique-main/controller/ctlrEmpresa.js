const express = require("express");
const ctlrEmpresa = express.Router();

const Empresa = require("./Database/empresa");

ctlrEmpresa.get("/cadastro_empresa", (req,res) => {
    res.render("Cadastro/cadastro_empresa")
})

ctlrEmpresa.post("/", (req, res) => {

    let {razao, cnpj, nome, endereço} = req.body;

    Empresa.create({
        CNPJ: cnpj,
        Nome: razao,
        Endereco: endereço
    }).

    res.sendStatus(200);

})


module.exports = ctlrEmpresa