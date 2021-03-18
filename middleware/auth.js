const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({
            msg: 'Sorry we could not validate yout token/client'
        }),
        res.redirect('/')
    }
    try{
        const decoded = jwt.verify(token, config.get('jwtsign'))
        req.user = decoded.user
        next()
    } catch (err) {
        console.log(err)
        res.status(403).send('Bad request, check your autorization and try again')
    }
}