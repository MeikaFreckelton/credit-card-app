const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

router.get('/', (req, res) => res.send('User route'));

router.post('/',
    body('email', 'Email is a required field').isEmail(),
    body('password', 'A minimum of 6 characters is required!').isLength ({ min: 6}),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
        console.log(req.body)
        
        try {
            console.log("hello")

            let user = await User.findOne({ email });
            console.log('USER')
    
            if(user) {
                res.status(400).json({ errors: [ { msg: 'User already exists' }]});
            }
    
            
    
            user = new User({  
                email,
                password
            });
    
            // HASHING THE PASSWORD WITH BCRYPT
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
    
            // SAVE THE USER TO THE DB
            await user.save();
    
            const send = {
                user: {
                    id: user.id
                }
            }
    
            jwt.sign(send, config.get('jwtsign'),
                    { expiresIn: 560000},
                    (err, token) => {
                        if(err) throw err;
                        res.json({ token })
                    });
            
            // CATCHING ANY ERRORS ABOVE AND SENDING A SERVER ERROR IN SAVING TO THE DB
        } catch(err) {
            console.error('THIS IS ERROR: ', err.message);
            res.status(500).send('Opps, something went wrong with saving your profile :(...');
        }

    }
)

module.exports = router;
