const jwt = require('jsonwebtoken')


const checkToken = (req, res, next) => {

    try {
        console.log("hdrs",
            req.headers.authorization, req.headers
        );
        const token = req.headers.authorization.split(' ')[1];
        const idJwt = jwt.verify(token, process.env.SECREET)
        next()
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(401).send(error)
    }
}

module.exports = checkToken