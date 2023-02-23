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
    firebase.firestore().collection("products").where("name","==",params.name).get().then((res)=>{
      res.forEach(doc=>{
        // console.log(doc.data());
        setPostDetails(doc.data())
      })
    })
  })

  //get user details
  useEffect(()=>{
    if (postDetails.userId ){
      const userId = postDetails.userId;
      // console.log("yes :" + userId);
      firebase.firestore().collection("users").where("id","==",userId).get().then((res)=>{
        res.forEach(doc=>{
          // console.log(doc.data());
          setUserDetails(doc.data());
        })
      })
    }else{
      console.log("Loading..");
    }
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
