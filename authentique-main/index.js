const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('Public'));

app.get("/login", (req,res) => {
    res.render("login")
})

app.get("/cadastro", (req,res) => {
    res.render("/Cadastro/cadastro")
})

app.get("/index", (req, res) => {
    let nome = "Kaião";
    let lang = req.params.lang;
    let exibirMsg = false;

    let produto = [
        { nome: "Doritos", preço: 3.14 },
        { nome: "Coca-cola", preço: 5 },
        { nome: "Leite", preço: 1.45 }
    ]

    res.render("index", {
        nome: nome,
        lang: lang,
        teste: "Testando as coisas",
        msg: exibirMsg,
        produtos: produto
    })
});

app.get("/Documento", (req,res) => {
    res.render("recibo")
})

app.listen(8080, () => {
    console.log("Servidor iniciado com sucesso!")
});