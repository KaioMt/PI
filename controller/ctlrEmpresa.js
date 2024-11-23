const express = require("express");
const ctlrEmpresa = express.Router();

const Empresa = require("../Database/empresa");

ctlrEmpresa.get("/cadastro_empresa", (req, res) => {
    res.render("Cadastro/cadastro_empresa")
})

ctlrEmpresa.post("/", (req, res) => {

    let {cnpj, nome, endereco, estado, razao, bairro, numero } = req.body;

    Empresa.create({
        CNPJ: cnpj,
        Nome: nome,
        Endereco: endereco,
        Estado: estado,
        Razao: razao,
        Bairro: bairro,
        Numero: numero,

    })

    res.sendStatus(200);

})


module.exports = ctlrEmpresa