const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User')
const Card = require('../models/Card')

// get all cards

router.get("/", async (req, res) => {
    try{
        const cards = await Card.find().sort({ date: -1 })
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
        // const errors = validationResult(req)
        // if(!errors.isEmpty()){
        //     return res.status(400).json({ errors: errors.array()})

        // }
        try {
            // const user = await (await User.findById(req.user.id)).isSelected('-password');
            console.log("eee")
            const newCard = new Card ({
                modified_date: new Date(),
                cardNumber: req.body.cardNumber,
                cardName: req.body.cardName,
                expiryMonth: req.body.expiryMonth,
                expiryYear: req.body.expiryYear,
                cvv: req.body.cvv,
                // user: req.user.id,
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