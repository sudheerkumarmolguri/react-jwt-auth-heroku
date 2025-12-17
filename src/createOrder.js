import React, { useState } from "react";
import API from "./api";

export default function CreateOrder() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");

  const createOrder = async () => {
    try {
      const res = await API.post("http://localhost:3000/orders", {
        product_name: productName,
        quantity: quantity,
      });
      localStorage.setItem("token", res.data.token);

      alert("Order created and waiting for admin approval.");
      setProductName("");
      setQuantity("");
    } catch (err) {
      console.log(err);
      alert("Error creating order");
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <input
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br />

      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />

      <button onClick={createOrder}>Place Order</button>
    </div>
  );
}
