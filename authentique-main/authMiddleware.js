const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    if (!req.cookies.token) {
        // return res.status(403).json({ mensagem: 'Token não fornecido' });
        res.redirect("/usuario/login")
    }

    const JWTScret = "123456789";

    jwt.verify(req.cookies.token, JWTScret, (err, user) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido' });
        } else {
            req.Token = req.cookies.token;
            req.loggedUser = { id: user.id, nome: user.nome, email: user.email, empresa: user.empresa, };
            next();
        }
    });
}

module.exports = authenticateToken;
