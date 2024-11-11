//bibliotecas
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const Documento = require("./Database/documentos");
const Usuario = require("./Database/usuario");
const Empresa = require("./Database/empresa");


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

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Rotas
app.get("/", (req,res) => {
    res.render("login")
})

app.get("/principal", (req,res) => {
    res.render("index")
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

app.get("/Documento", (req,res) => {
    res.render("recibo")
})



app.get("/documentos", async (req, res) => {
    res.statusCode = 200;
    let documentos = await  Documento.findAll({raw: true, order:[
        ['id', 'ASC']
    ]})
    res.json(documentos)
});

app.get("/documento/:id", async (req, res) => {
    let id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        let documento = await Documento.findOne({
            where: {id: id}
        })

        if(documento != undefined){
            res.statusCode = 200;
            res.json(documento);
        }else{

            res.sendStatus(404)

        }

    }

})


//rotas posts

app.post("/documento", async (req, res) => {

    let {destinatario, titulo, doc} = req.body;

    let novo = await Documento.create({
        Titulo: titulo,
        Conteudo: doc,
        Status: 1,
        Email_dest: destinatario
    });

    res.sendStatus(200);

})


app.post("/login", async (req, res) => {
        const { email, senha } = req.body;
      
        try {
          const usuario = await Usuario.findOne({ where: { email, senha } });
      
          if (!usuario) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
          }
          else{
          return res.json({ mensagem: 'Login realizado com sucesso' });
        }
        } catch (erro) {
          console.error(erro);
          return res.status(500).json({ mensagem: 'Erro no servidor' });
        }
});

app.post("/usuario", (req, res) => {

    let {nome, email, senha} = req.body;
    Usuario.create({
        Nome: nome,
        Email: email,
        Senha: senha
    })

    res.sendStatus(200);

})


app.post("/salvaEmpresa", (req, res) => {

    let {razao, cnpj, nome, endereço} = req.body;

    Empresa.create({
        CNPJ: cnpj,
        Nome: Razao,
        Endereco: Endereco
    }).

    res.sendStatus(200);

})



//rotas delete

app.delete("/documento/:id", async (req, res) => {
    let id = req.params.id;

    if (isNaN(id)) {
        return res.sendStatus(400); 
    } else {
        try {
            let documento = await Documento.findOne({ where: { id: id } });

            if (documento) {
                await Documento.destroy({ where: { id: id } });
                res.sendStatus(200); 
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500); 
        }
    }
});


//rotas de edição

    app.put("/documento/:id", async (req, res) => {
        const id = req.params.id;
    
        if (isNaN(id)) {
            return res.sendStatus(400);
        } 
    
        try {
            const documento = await Documento.findOne({ where: { id: id } });
    
            if (documento !== undefined) {
                const { destinatario, titulo, doc } = req.body;
    
                const updateData = {};
                if (titulo != undefined) updateData.Titulo = titulo;
                if (destinatario != undefined) updateData.Email_dest = destinatario;
                if (doc != undefined) updateData.Conteudo = doc;
                
                
                if (Object.keys(updateData).length > 0) {
                    await Documento.update(updateData, { where: { id: id } });
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(400);
                }
            } else {
                return res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    });


app.listen(8080, () => {
    console.log("API RODANDO")
});
