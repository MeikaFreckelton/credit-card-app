import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import history from './../history'


const Home = ({ user, setUser }) => {

    useEffect(() => {
        if (user.email) {
            history.push("/newCard")
        }
    })

    return (
        <div className="page home">
            <div className="heading">
                Card Saver
            </div>
            <div className="subHeading">
                <p className="subMsg">Save and access all of your card details in one convenient location</p>
                Create an account or log in to get started

            </div>
            <div className="authLinksDiv">
                <Link to="/register" className="authLinks" >Register</Link>
                <Link to="/login" className="authLinks" >Log in</Link>
            </div>
        </div>
    )
}

export default Home