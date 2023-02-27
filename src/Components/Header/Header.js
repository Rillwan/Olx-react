import React, { useContext, useState } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/Context";
import userLogo from '../../img/user.jpg'
import { useHistory } from "react-router-dom";

function Header() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [search, setSearch] = useState('');

  // const { firebase } = useContext(FirebaseContext);

  const login = ()=>{
    console.log("login")
    history.push("/login")
  }

  const logout = ()=>{
    console.log("logout");
    history.push("/login")
  }

  const create = ()=>{
    console.log("create");
    history.push("/create")
  }

  //searchin...
  const handleSearching = ()=>{
    // console.log(search);
    history.push(`/view/${search}`)

    //name text change uppercase letters
    // const capitalizeWords = (str) => {
    //   return str
    //     .toLowerCase()
    //     .split(' ')
    //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //     .join(' ');
    // };

    //searching with url 
    // const productName = capitalizeWords(search);
    // console.log(productName);
    // history.push(`/view/${productName}`)

    // firebase.firestore().collection("products").where("name","==","Samsung S22 ultra").get().then((res)=>{
    //   res.forEach(doc=>{
    //     console.log(doc.data());
    //   })
    // })

  }

  //name text change uppercase letters
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="headerParentDiv ">
      <div className="headerChildDiv ">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <input type="text" defaultValue="India" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input" >
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={capitalizeWords(search)}
              onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSearching();
                        }
                    }}
              onChange={(e)=>{
                setSearch(e.target.value)
              }}
            />
          </div>
          <div className="searchAction" onClick={()=>{
            handleSearching();
          }}>
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">  
          <button type="button" className="btn" data-toggle="dropdown" aria-expanded="false">
            <span className="language-hover"> ENGLISH </span>
          </button>
          <div className="dropdown-menu">
            <span className="dropdown-item" >Hindi</span>
            <span className="dropdown-item" >Malayalam</span>
            <span className="dropdown-item" >Tamil</span>
          </div> 
        </div>
        <div className="loginPage">
          { user ? <span type="button" data-toggle="dropdown" aria-expanded="false">
             <img src={user ? userLogo : ""} className="rounded-circle" alt="user" width={"40"} /> 
          </span> : <span onClick={login} className='login'>Login</span> }
          <div className="dropdown-menu">
            <span className="dropdown-item" >{user ? user.displayName : "Login"}</span>
           { user && <span className="dropdown-item" onClick={logout}>Logout</span> }
           { user && <span className="dropdown-item" onClick={create}>Sell Product</span> }
          </div> 
        </div>
        <div className="sellMenu" onClick={create}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
