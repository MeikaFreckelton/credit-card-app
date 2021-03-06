const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./../middleware/auth')

const User = require('../models/User')


router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch(err) {
        console.log('ERR', err);
        res.status(500).send('Server Error')
    }
    
});


// create new user account : 
router.post('/register',
    body('email', 'Email is a required field').isEmail(),
    body('password', 'A minimum of 6 characters is required!').isLength ({ min: 6}),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
        
        try {

            let user = await User.findOne({ email });
    
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
    
            jwt.sign(send, process.env.jwtsign,
                    { expiresIn: 560000},
                    (err, token) => {
                        if(err) throw err;
                        res.json({ token })
                    });
            
            // CATCHING ANY ERRORS ABOVE AND SENDING A SERVER ERROR IN SAVING TO THE DB
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Opps, something went wrong with saving your profile :(...');
        }

    }
)

router.post('/login',
    body('email', 'Email is a required field').isEmail(),
    body('password', 'A minimum of 6 characters is required!').exists().isLength ({ min: 6}),

    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;


        try {
            let user = await User.findOne({ email });

    
            if(!user) {
               return res.status(400).json({ errors: [ { msg: 'Invalid User' }]});
            }
    
    
            const compares = await bcrypt.compare(password, user.password);
    
            if(!compares) {
                return res.status(400).json({ errors: [ { msg: 'Invalid User' }]});
            }
    
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            const send = {
                user: {
                    id: user.id
                }
            }

            const userID = user.id
            
            jwt.sign(send, process.env.jwtsign,
                { expiresIn: 560000},
                (err, token) => {
                    if(err) {
                        console.log('ERROR', err)
                        throw err;
                    }
                    res.json({ token, userID })
                }
            );
                    
            
            // CATCHING ANY ERRORS ABOVE AND SENDING A SERVER ERROR IN SAVING TO THE DB
        } catch(err) {
            console.log('ERROR')
            console.error(err.message);
            res.status(500).send('Opps, something went wrong with saving your profile :(...');
        }



    }

)

module.exports = router;
