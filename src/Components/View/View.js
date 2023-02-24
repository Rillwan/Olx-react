import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";

import "./View.css";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { firebase } = useContext(FirebaseContext);
  const [postDetails, setPostDetails] = useState([]);

  //url product name
  const params = useParams();
  // console.log(params);

  //clicked product data get
  useEffect(()=>{
    let productMounted = true;
      firebase.firestore().collection("products").where("name","==",params.name).get().then((res)=>{
        res.forEach(doc=>{
          if(productMounted){
          // console.log(doc.data());
          // console.log("true product");
          setPostDetails(doc.data())
          }
        })
      })
      return (()=>{
        productMounted = false
        // console.log("false product");
      })
    })

  //get user details
  useEffect(()=>{
    let userMounted = true;
      if (postDetails.userId ){
        const userId = postDetails.userId;
        // console.log("yes :" + userId);
        firebase.firestore().collection("users").where("id","==",userId).get().then((res)=>{
          res.forEach(doc=>{
            if(userMounted){
              // console.log(doc.data());
              setUserDetails(doc.data());
              // console.log("true user");
            }             
          })
        })
      }else{
        console.log("Loading..");
      }
      return(()=>{
        userMounted = false;
        // console.log("false User");
      })
    })

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={ postDetails.url } alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        { userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
