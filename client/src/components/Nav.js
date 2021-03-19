import React from 'react'
import { Link } from 'react-router-dom'
import history from './../history'

const Nav = ({ user, setUser }) => {

    // log out function
    const logOut = () => {
        history.push("/")
        setUser({
            email: "",
            id: ""
        });
    }

    
    return (
        <div>
            
            {
                user.email ? (
                    <div className="nav">
                        <p className="logo">Card Saver</p>
                        <div className="navLinksDiv">
                            <Link to="/newcard" className="navLinks" >New card</Link>
                            <Link to="/cards" className="navLinks" >My cards</Link>
                            <p onClick={logOut} className="navLinks logout" >Log out</p>
                        </div>
                        
                        {/* <i class="fas fa-bars"></i> */}
                    </div>
                    
                ) : ( null
                    
                )
            }
                
                
            

        </div>
    )
}

export default Nav