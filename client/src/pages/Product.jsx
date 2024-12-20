import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const productDetails = await getProductById(productId);
      setProduct(productDetails);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      productId: product.id, 
      quantity: 1,
      price: product.price, 
      title: product.title   }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={product.thumbnail} alt={product.title} style={{ width: "300px" }} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price} RON</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
