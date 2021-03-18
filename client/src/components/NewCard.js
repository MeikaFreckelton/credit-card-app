import React, { useState, useEffect } from 'react'
import history from './../history'
import { addNewCard } from './../config/api'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import creditCardType from 'credit-card-type'



const NewCard = ({ user }) => {

    const [errors, setErrors] = useState(" ")
    const [cardPic, setCardPic] = useState("cardDisplay")
    const [cardType, setCardType] = useState("")
    

    useEffect(() => {
        if (!user.email) {
            history.push("/")
        }
    }, [user.email] )


    const [formData, setFormData] = useState({
        cardNumber: "",
        cardName: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: ""
    })

    

    const monthRange = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
    ]

    const yearRange = [
        "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"
    ]

    const handleNumberChange = e => {
        const { value } = e.target

        if(isNaN(Number(value))) {
            return;
        } else {
            setFormData({
                ...formData,
                cardNumber: value
            })
            if (value.length > 12 && creditCardType(value) !== undefined){

                let creditCard = creditCardType(value)
                if (creditCard[0] !== undefined){
                    setCardType(creditCard[0].niceType)

                }

            }
            setCardPic("cardDisplay")

        }
    }
    
    const handleChange = e => {
        const { name, value } = e.target        

        if (name === "cvv"){
            if(isNaN(Number(value))  ) {
                return;
            } else {

                setFormData({
                    ...formData,
                    cvv: value
                })
                setCardPic("cardDisplay")

            }
            setCardPic("backCardDisplay")


            
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
            setCardPic("cardDisplay")

        }


        
    }

    const handleYear = e => {
        setFormData({
            ...formData,
            expiryYear: e.value
        })
        setCardPic("cardDisplay")
    }

    const handleMonth = e => {
        setFormData({
            ...formData,
            expiryMonth: e.value
        })
        setCardPic("cardDisplay")
    }
    const { cardNumber, cardName, expiryMonth, expiryYear, cvv } = formData

    const handleSubmit = e => {
        e.preventDefault()
        
        if ( cardNumber.length > 12 && cardName !== "" && expiryMonth !== "" && expiryYear !== "" && cvv !== ""){
            let newCard = {
                cardNumber: cardNumber,
                cardName: cardName,
                expiryMonth: expiryMonth,
                expiryYear: expiryYear,
                cvv: cvv,
                user: user.id
            }
            addNewCard({ newCard, setErrors })
            history.push("/cards")


        } else {
            setErrors("Form Invalid! Please ensure all fields are filled.")
        }
        

    }




    return (
        <div className="page newCardWrapper">
            <div className="heading">
                New Card
                
            </div>
            <main className="newCard">
                
                <div className={cardPic} >
                    {
                        cardPic !== "backCardDisplay" && 
                        <div className="frontDetails">
                            
                            <p className="cardNum">{cardNumber.slice(0, 4)} {cardNumber.slice(4, 8)} {cardNumber.slice(8, 12)} {cardNumber.slice(12, 16)}   </p>
                            <div className="nameExpiryDisplay">
                                <div className="cardHolder">
                                    <p className="nameLabel">Card Holder</p>
                                    <p>{cardName.toUpperCase() }</p>
                                </div>
                                <div className="expiryDisplay">
                                    <p className="expires">Expires</p>
                                    <p className="exp">{expiryMonth} / {expiryYear.slice(2, 4)} </p>
                                </div>
                                
                            </div>
                        </div>
                    }
                    {
                        cardPic === "backCardDisplay" && (/\s/.test(cvv) === false) && cvv.length > 0 &&
                        <div className="backDetails">
                            <p>{cvv}</p>
                        </div>
                    }
                    
                    
                    

                    
                    

                </div>
                <div className="cardForm">
                    <p className="errors">{errors}</p>

                    <p className="typeDisplay">{cardType && cardType}</p>
                    
                    <div className="formFields">
                        <label>Card Number</label>
                        <input type="text" value={formData.cardNumber} name="cardNumber" onChange={handleNumberChange} maxLength="16"/>
                    </div>

                    <div className="formFields">
                        <label>Card Name</label>
                        <input value={formData.cardName} name="cardName" onChange={handleChange} />
                    </div>

                    <div className="expiryAndCvv">
                        <div className="expiry">
                            <label>Expiration Date</label>
                            <div className="rowFields">
                                <div>
                                    <Dropdown options={monthRange} onChange={handleMonth} value={formData.expiryMonth} placeholder="Month" name="expiryMonth" />
                                </div>
                                <div>
                                    <Dropdown options={yearRange} onChange={handleYear} value={formData.expiryYear} placeholder="Year" name="expiryYear" />
                                </div>
                            </div>
                        </div>

                        <div className="rowFields cvv">
                            <div>
                                <label>CVV</label>
                                <input type="text" value={formData.cvv} name="cvv" onChange={handleChange} maxLength="4" />
                            </div>
                        </div>

                    </div>
                    <input type="submit" onClick={handleSubmit} value="Save"></input>

                </div>
            </main>
        </div>
    )
}

export default NewCard