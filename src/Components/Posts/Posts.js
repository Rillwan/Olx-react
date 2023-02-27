import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Heart from "../../assets/Heart";
import { FirebaseContext } from "../../store/Context";
import "./Post.css";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [sortDate, setSortDate] = useState([]);

  //quick menu lists
  useEffect(() => {
    let isMounted = true;
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        if(isMounted){
          setProducts(allPost);
        }
        // console.log(allPost);
      });
      return (()=>{
        isMounted = false
      })
  },[firebase]);

  //Fresh recommendations listes
    useEffect(() => {
      if(products.length !== 0){
        const sorting = products.sort(function(a,b){
          // console.log(a.createdAt,b.createdAt);
          return new Date(b.createdAt) + new Date(a.createdAt);
        });
        // console.log(sorting);
        setSortDate(sorting)
      }
      return () => {
        
      };
    }, [products]);

  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product, index) => {
            return (
              <div
                className="card"
                key={index}
                onClick={() => {
                  history.push(`/view/${product.name}`);
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price} </p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name"> {product.category} </p>
                </div>
                <div className="date">
                  <span> {product.createdAt} </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
        { sortDate.map((product,index) => {
          return (
          <div className="card" key={index} onClick={() => {
                  history.push(`/view/${product.name}`);
                }} > 
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer"></span>
              <p className="name"> {product.name} </p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          )
        })
           
        }
        </div>
        
      </div>
    </div>
  );
}

export default Posts;
