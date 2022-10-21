import React, { useState, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import M from 'materialize-css'
import { UserContext } from '../App'

const Signin = () => {

  const { dispatch } = useContext(UserContext)


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const history = useHistory()

  let { update } = useParams()


  const postData = (update) => {

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
      return
    }
    fetch('http://localhost:5000/signin', {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    }).then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" })
        }
        else {

          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user })
          M.toast({ html: "Signin Successfully", classes: "#43a047 green darken-1" })
          history.push('/', { state: data.user })
          
        }
      }).catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="mycard">

      <div className="card auth-card ">
        <h2>Product</h2>
        <input type="text" placeholder='Email'
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder='Password'
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light"
          onClick={() => postData(update)}
        >Login</button>
        <h5>
          <Link to='/signup'>Create a new an account</Link>
        </h5>
      </div>
    </div>
  )
}

export default Signin