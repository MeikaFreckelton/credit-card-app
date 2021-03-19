const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function(req, res, next) {
    const token = req.header('x-auth-token') || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }



    if (!token) {
        return res.status(401).json({
            msg: 'Sorry we could not validate yout token/client'
        }),
        res.redirect('/')
    }



    try{
        jwt.verify(token, config.get('jwtsign'), (err, decoded) => {
            if (err){
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded
                next();
            }
        })
        // req.user = decoded.user
        // next()
    } catch (err) {
        // return res.json({
        //     success: false,
        //     message: 'Auth token is not supplied'
        // })
        console.log(err)
        res.status(403).send('Bad request, check your autorization and try again')
    }
}