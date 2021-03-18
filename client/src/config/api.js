import axios from 'axios'
import history from './../history'

const setAuthToken = token => {
    if (token){
        axios.defaults.headers.common['x-auth-token'] = token
    } else{
        delete axios.defaults.headers.common['z-auth-token']
    }
}


export default axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    // withCredentials: true
})




export const loadUser = async () => {
  if (localStorage.token) {
    console.log('yes token')
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get("http://localhost:8080/api/users/")
    return res
    
    

    
  } catch (err) {
    console.log(err)
  }
}

export const register = async ({ email, password, setErrors, setUser }) => {
    const config = {
        headers: {
          'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify ({ email, password })
    console.log(body)
    try {
        console.log(body, config)
        const res = await axios.post('http://localhost:8080/api/users/register', body, config)
        console.log(res)
        if (res){
          setUser({
            email: email,
            id: ""
          })
          history.push('/newCard')
        }

        
      } catch (err) {
        setErrors("invalid, try again")

        
        if(err) {
          console.log('ERROR', err)
        }
        
      }

}

export const logIn = async ({ email, password, setErrors, setForm, setUser, user }) => {
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('http://localhost:8080/api/users/login', body, config)
    console.log(res.data.userID)
    if (res){
      history.push('/newCard')
      setUser({
        email: email,
        id : res.data.userID
      })
    } 
    // .then(history.push('/newCard'))
    

    console.log(user.id)
    

  } catch (err) {

    setErrors("invalid user, try again")
    setForm({
      email: "",
      password: ""
    })

  }

}

export const addNewCard = async ({ newCard, setErrors }) => {

  // console.log(newCard)

  // const body = JSON.stringify({ newCard })
  // const body 
  console.log(newCard)


  try {
    const res = await axios.post('http://localhost:8080/api/cards/newCard', newCard)



  } catch(err) {
    console.log(err)
    // setErrors(err)
    


  }


}

export const getAllCards = async () => {

  try{
    const res = await axios.get('http://localhost:8080/api/cards')
    return res

  } catch (err) {
    console.log(err)
  }

}

// export const getCardsByUserId = async ({ user }) => {

//   try {
//     const res = await axios.get(`http://localhost:8080/api/cards/${user.id}`)

//   } catch (err) {
//     console.log(err)
//   }
// }