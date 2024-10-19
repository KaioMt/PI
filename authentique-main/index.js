//bibliotecas
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const Documento = require("./Database/documentos");

//conexão com banco
const connection = require("./Database/database");
const { where } = require("sequelize");

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
app.get("/", (req,res) => {
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
    Documento.findAll({raw: true, order:[
        ['id', 'ASC'] //ordenação por id
    ]}).then(Documentos => {
        res.render("index", {
            documentos: Documentos
        })
    })
    
});

app.get("/Documento", (req,res) => {
    res.render("recibo")
})

app.post("/salvaDoc", (req, res) => {
    let destinatario= req.body.destinatario;
    let titulo = req.body.testa;
    let doc = req.body.Documento;
    Documento.create({
        Titulo: titulo,
        Conteudo: doc,
        Status: 1,
        Email_dest: destinatario
    }).then(() => {
        res.redirect("/index")
    })
})


app.get("/documento/:id", (req, res) => {
    let id = req.params.id;
    Documento.findOne({
        where: {id: id}
    }).then(documento =>{
        if(documento != undefined){
            res.render("documento", {
                doc: documento
            });
        }else{
            res.redirect("/index")
        }
    })
})


app.listen(8080, () => {
    console.log("Servidor iniciado com sucesso!")
});