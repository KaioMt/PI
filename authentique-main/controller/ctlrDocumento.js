const express = require("express");
const ctlrDocumento = express.Router();

const Documento = require("../Database/documentos");


router.get("/recibo", (req,res) => {
    res.render("recibo")
})

ctlrDocumento.get("/", async (req, res) => {
    res.statusCode = 200;
    let documentos = await  Documento.findAll({raw: true, order:[
        ['id', 'ASC']
    ]})
    res.json(documentos)
});


ctlrDocumento.get("/:id", async (req, res) => {
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



ctlrDocumento.post("/", async (req, res) => {

    let {destinatario, titulo, doc} = req.body;

    let novo = await Documento.create({
        Titulo: titulo,
        Conteudo: doc,
        Status: 1,
        Email_dest: destinatario
    });

    res.sendStatus(200);

})



ctlrDocumento.delete("/:id", async (req, res) => {
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


ctlrDocumento.put("/:id", async (req, res) => {
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

module.exports = ctlrDocumento