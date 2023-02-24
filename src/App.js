import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { AuthContext, FirebaseContext } from "./store/Context";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";

function App() {

  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    let isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user ? user.displayName : "Username missing");
      if(isMounted){
        setUser(user);
      }
    });
    return(()=>{
      isMounted = false;
    })
  });
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/view/:name">
          <View />
        </Route>
      </Router>
    </div>

  );
}

export default App;
