import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {

    return (
        <div>
            <div className="heading">
                <h1>Welcome to the card collector</h1>
            </div>
            <div>
                <Link to="/newCard">Add a new card</Link>
                <Link to="/cards">View saved cards</Link>
                
            </div>

        </div>
    )
}

export default Dashboard