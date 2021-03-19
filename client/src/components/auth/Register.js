import React, { useState } from 'react'
import { register } from './../../config/api'
// import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Register = ({ user, setUser }) => {
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
        // console.log(email, password)
        try{
            register({ email, password, setUser, setErrors } )


        } catch (err){
            console.log(err)
        }
        console.log("hello");


    }


    return (
        <div>
            <div className="heading">
                Create an account
            </div>
            <div className="authForm">
                <div>
                    {errors}
                </div>
                <div className="authFields">
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={handleChange} />  
                </div>
                <div className="authFields">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange} /> 
                </div>
                <input type="submit" onClick={handleSubmit} />
                <div className="altAuth">
                    <Link to="/login">Or log in to an existing account</Link>
                </div>
            </div>
            

        </div>
    )
}

export default Register