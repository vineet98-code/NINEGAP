import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = (props) => {

  const location = useLocation();

  localStorage.setItem("data", location.state);

  const final = JSON.parse(localStorage.getItem("user"))

  console.log(location.state, final)

  return (
    <center className="">
      <div className="card home-card">
        <h1>Welcome  {final.FirstName} {final.LastName}</h1>

        <div className="card-content ">
          <h6>{final.email}</h6>
        </div>

        <div className="card-image">
          {/* <img src={ } alt={item.image} /> */}
        </div>
      </div>
    </center>
  )
}

export default Home