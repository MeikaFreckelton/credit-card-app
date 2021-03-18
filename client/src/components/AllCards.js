import React, { useEffect, useState } from 'react'
import history from './../history'
import { getAllCards } from './../config/api'

const AllCards = ({ user, setUser }) => {
    const [cards, setCards] = useState([])

    const [cardPic, setCardPic] = useState("cardDisplayAllCards")





    useEffect(() => {
        if (!user.email) {
            history.push("/")
        }

        getAllCards().then((cards) => {
            setCards(cards.data)
        })

    }, [user] )

    let filteredCards = cards.filter(x => x.user === user.id)


    const handleCardCLick = (e) => {
        if (cardPic === "cardDisplayAllCards"){
            setCardPic("backCardDisplayAllCards")
            console.log(cardPic)

        } else {
            setCardPic("cardDisplayAllCards")

        }
    }

    


    const displayCards = (card) => {

        let { cardNumber, cardName, expiryMonth, expiryYear, cvv } = card
        cardNumber = cardNumber.toString()

        return (
            <div className={cardPic} onClick={handleCardCLick}>
                {
                    cardPic !== "backCardDisplayAllCards" &&
                    <div className="frontDetails">
                        <p className="cardNum">{cardNumber.slice(0, 4)} {cardNumber.slice(4, 8)} {cardNumber.slice(8, 12)} {cardNumber.slice(12, 16)}    </p>
                        <div className="nameExpiryDisplay">
                            <div className="cardHolder">
                                <p className="nameLabel">Card Holder</p>
                                <p>{cardName.toUpperCase()}</p>
                            </div>
                            <div className="expiryDisplay">
                                <p className="expires">Expires</p>
                                <p className="exp">0{expiryMonth} / {expiryYear.toString().slice(2, 4)} </p>
                            </div>
                            
                        </div>
                    </div>
                }
                {
                    cardPic === "backCardDisplayAllCards" && 
                    <div className="backDetails">
                        <p>{cvv}</p>
                    </div>
                }
                
                
                    
                    

            </div>
        )
    }



    return (
        <div>

            <div>
                <div className="heading">
                    Your Saved Cards
                </div>
                <div className="allCardsDiv">
                    {
                        filteredCards && 
                        filteredCards
                        .map(x => {
                            return displayCards(x)
                        })

                    }
                </div>
                
                
            </div>


        </div>
    )
}

export default AllCards