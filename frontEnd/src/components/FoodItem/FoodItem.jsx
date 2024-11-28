/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./foodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* <img className="food-item-image" src={image} alt={image + "" + description} loading="lazy" /> */}

        <picture>
          {/* AVIF Format */}
          <source srcSet={`${image.replace(/\.(png|jpg|jpeg)$/, ".avif")}`} type="image/avif"/>
          {/* WebP Format */}
          <source srcSet={`${image.replace(/\.(png|jpg|jpeg)$/, ".webp")}`} type="image/webp"/>
          {/* Original Fallback */}
          <img className="food-item-image"  width="300" height="200" src={image} alt={`${name} ${description}`} loading="lazy"/>
        </picture>


        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt={'add_icon_white' + id}
            className="add"
            loading="lazy"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              loading="lazy"
              src={assets.remove_icon_red}
              alt={'remove_icon_red' + id}
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              loading="lazy"
              src={assets.add_icon_green}
              alt={'add_icon_green' + id}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;