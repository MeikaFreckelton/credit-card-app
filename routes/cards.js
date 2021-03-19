const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// const auth = require('../middleware/auth');

const User = require('../models/User')
const Card = require('../models/Card')

// get all cards

router.get("/", async (req, res) => {
    try{
        const cards = await Card.find().sort({ date: +1 })
        res.json(cards)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// new card :

router.post("/newCard", 
    body('cardNumber', 'Card Number is required')
        .not()
        .isEmpty(),
    body('cardName', 'Card Name is required')
        .not()
        .isEmpty(),
    body('expiryMonth', 'Expiry Month is required')
        .not()
        .isEmpty(),
    body('expiryYear', 'Expiry Year is required')
        .not()
        .isEmpty(),
    body('cvv', 'CVV is required')
        .not()
        .isEmpty(),

    async (req, res) => {
        
        try {

            const currentUser = await User.findById(req.body.user);
            const newCard = new Card ({
                modifiedDate: new Date(),
                cardNumber: req.body.cardNumber,
                cardName: req.body.cardName,
                expiryMonth: req.body.expiryMonth,
                expiryYear: req.body.expiryYear,
                cvv: req.body.cvv,
                user: currentUser._id,
            });

            const card = await newCard.save();
            res.json(card);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');

        }
    }

)

module.exports = router;