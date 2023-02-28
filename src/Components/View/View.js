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
  useEffect(() => {
    let productMounted = true;
    firebase
      .firestore()
      .collection("products")
      .where("name", "==", params.name)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          if (productMounted) {
            // console.log(doc.data());
            // console.log("true product");
            setPostDetails(doc.data());
          }
        });
      });
    return () => {
      productMounted = false;
      // console.log("false product");
    };
  });

  //get user details
  useEffect(() => {
    let userMounted = true;
    if (postDetails.userId) {
      const userId = postDetails.userId;
      // console.log("yes :" + userId);
      firebase
        .firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            if (userMounted) {
              // console.log(doc.data());
              setUserDetails(doc.data());
              // console.log("true user");
            }
          });
        });
    } else {
      console.log("Loading..");
    }
    return () => {
      userMounted = false;
      // console.log("false User");
    };
  });

  return (
    <div className="viewParentDiv px-5">
      <div className="imageShowDiv text-center">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
        <div className="Location">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62651.038457671646!2d76.03337210569218!3d11.061859684744068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64a9be29b058f%3A0x23e371e0d4c30d8e!2sMalappuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1677552416355!5m2!1sen!2sin"
            width="268"
            height="160"
            style={{border:"0"}}
            loading="lazy"
            title="myFrame"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
export default View;
