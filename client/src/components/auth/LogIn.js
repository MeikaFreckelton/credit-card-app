import React, { useState } from 'react'
import { logIn } from './../../config/api'
import { Link } from 'react-router-dom'

const LogIn = ({ user, setUser }) => {
    const [formState, setForm] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState("")

    const { email, password } = formState

    const handleChange = e => {
        const { name, value } = e.target
        setForm({
            ...formState,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        try{
            logIn({ email, password, setErrors, setForm, setUser, user } )
            
        } catch (err){
            console.log(err)
        }


    }


    return (
        <div>
            <div className="heading">
                Log In
            </div>
            <div className="authForm">
                <div>
                    {errors}
                </div>
                <div className="authFields">
                    <label>Email</label>
                    <input name="email" value={email} onChange={handleChange} />  
                </div>
                <div className="authFields">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange} /> 
                </div>
                <input type="submit" onClick={handleSubmit} value="Log In"/>
                <div className="altAuth">
                    <Link to="/register">Or create a new account</Link>
                </div>
            </div>

        </div>
    )
}

export default LogIn