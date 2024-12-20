import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { addToCart as addToCartApi } from "../api/cartApi";
import "./Home.css"

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Memorează lista de produse filtrate pentru performanță
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        (category ? product.category === category : true) &&
        (maxPrice ? product.price <= maxPrice : true)
      );
    });
  }, [products, category, maxPrice]);

  const handleAddToCart = async (product) => {
    try {
      const updatedCart = await addToCartApi(product.id, 1, product.price, product.title);
  
      // Actualizează coșul în Redux Store
      dispatch(
        addToCart({
          productId: product.id,
          quantity: 1,
          price: product.price,
          title: product.title, 
        })
      );
  
      console.log("Updated Cart:", updatedCart); 
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="home-container">
      <h2>Products</h2>
      <div className="filters">
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="beauty">Beauty</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="fragrances">Fragrances</option>
          </select>
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>{product.price} RON</p>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
