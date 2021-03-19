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
    baseURL: 'https://exp-card-server.herokuapp.com/',
    timeout: 10000,
    // withCredentials: true
})


export const loadUser = async () => {
  if (localStorage.token) {
    console.log('yes token')
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get("https://exp-card-server.herokuapp.com/api/users/")
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
    // console.log(email, password)
    try {

        const res = await axios.post('https://exp-card-server.herokuapp.com/api/users/register', body, config)
        console.log(res)
        if (res){
          setUser({
            email: email,
            id: ""
          })
          console.log(res)

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

  // const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('https://exp-card-server.herokuapp.com/api/users/login', { email, password }, config)
    if (res){
      history.push('/newCard')
      setUser({
        email: email,
        id : res.data.userID
      })


    } 
  } catch (err) {

    setErrors("invalid user, try again")
    setForm({
      email: "",
      password: ""
    })

  }

}

export const addNewCard = async ({ newCard }) => {

  


  try {
    const res = await axios.post('https://exp-card-server.herokuapp.com/api/cards/newCard', newCard)
    console.log(res)



  } catch(err) {
    console.log(err)
    


  }


}

export const getAllCards = async () => {

  try{
    const res = await axios.get('https://exp-card-server.herokuapp.com/api/cards')
    return res

  } catch (err) {
    console.log(err)
  }

}
