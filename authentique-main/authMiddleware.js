const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Espera 'Authorization: Bearer <token>'

    if (!token) {
        return res.status(403).json({ mensagem: 'Token não fornecido' });
    }

    const JWTScret = "123456789";

    jwt.verify(token, JWTScret, (err, user) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido' });
        } else {
            req.Token = token;
            req.loggedUser = { id: user.id, nome: user.nome, email: user.email, empresa: user.empresa, };
            next();
        }
    });
}

module.exports = authenticateToken;
