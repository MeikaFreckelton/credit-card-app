import React, { useEffect } from 'react'
import history from './../history'

const Card = ({ user, setUser }) => {

    useEffect(() => {
        if (!user) {
            history.push("/")
        }
    }, [user] )

    return (
        <div>

        </div>
    )
}

export default Card