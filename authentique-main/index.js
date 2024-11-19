//bibliotecas
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./router")

//conexão com bancos

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
app.use(cookieParser());
app.use(express.static('Public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/", bodyParser.json(), router)


app.listen(8080, () => {
    console.log("API RODANDO")
});
