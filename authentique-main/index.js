//bibliotecas
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//conexão com banco
const connection = require("./Database/database");

//Dastabase
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com banco de dados!")
    })
    .catch((msqErro) => {
        console.log(msqErro);
    })

app.set('view engine', 'ejs');
app.use(express.static('Public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Rotas
app.get("/login", (req,res) => {
    res.render("login")
})

app.get("/recuperar", (req,res) => {
    res.render("recuperar_conta")
})

app.get("/cadastro", (req,res) => {
    res.render("Cadastro/cadastro")
})

app.get("/cadastro_empresa", (req,res) => {
    res.render("Cadastro/cadastro_empresa")
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

app.post("/salvaDoc", (req, res) => {
    let destinatario= req.body.destinatario;
    let titulo = req.body.testa;
    let doc = req.body.Documento;
res.send("Teste, destinatario " + destinatario + " " + " titulo " + titulo + " " + "Docuemnto " + doc);
})

app.listen(8080, () => {
    console.log("Servidor iniciado com sucesso!")
});