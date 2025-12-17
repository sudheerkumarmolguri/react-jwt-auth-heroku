import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function UserDashboard() {

  const [user, setUser] = useState({});
  const [product_name, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then((res) => {
      console.log("Backend response:", res.data.user.role);
      console.log("Backend response:", res.data.user.email);

      setUser({ email: res.data.user.email });
      fetchOrders();

    })
    .catch((err) => {
      console.log(err);
    });
  }, []);   // run only once

  const handleLogout = () => {
    localStorage.removeItem("token");  // remove JWT token
    navigate("/register");   // redirect to login page
  };

  
  const order = async () => {
    try {
      const res = await API.post("http://localhost:3000/orders", { product_name, quantity });
      alert("Order created Successfully");
      setProductName("");
      setQuantity("");
      fetchOrders(); 
    } catch(error) {
      alert("Order creation failed");
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await API.get("http://localhost:3000/orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders", err);
    }
  };
  

  return (
    <div>

            <h1>User Dashboard</h1>
            <p>Welcome User: {user.email}</p>

        <h2>Your Orders</h2>

        {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
      <table border="1">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
         </thead>
         <tbody>
           {orders.map(order => (
           <tr key={order.id}>
             <td>{order.product_name}</td>
             <td>{order.quantity}</td>
            </tr>
            ))}
          </tbody>
      </table>
)}

 
     
     
      <h2>Create Order</h2>
      <input
        placeholder="Product Name"
        value={product_name}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br />

      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}

      />
      <br />

      <button onClick={(e) => { e.preventDefault(); order(); }}>
                 createOrder
             </button>
      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  

  
  
  );
  
  
}
