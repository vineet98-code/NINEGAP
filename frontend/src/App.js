import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import { reducer, initialState } from './reducers/useReducer';


export const UserContext = createContext()

const Routing = () => {

  const history = useHistory()
  const { dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(user)
    if (user) {
      dispatch({ type: "USER", payload:user })
      history.push('/')
    } else {
      history.push('/signin')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </Switch>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>

    </div>
  )
}

export default App