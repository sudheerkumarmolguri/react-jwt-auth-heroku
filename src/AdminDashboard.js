import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function AdminDashboard() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:3000/admin/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      console.log("Admin Response:", res.data.user.role);
      setUser({ email: res.data.user.email });
    })
    .catch(err => {
      console.error("Admin Error:", err);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  }, []);
  
  function approveOrder(id) {
    axios.put(`http://localhost:3000/admin/orders/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => alert("Order Approved"))
  }
  
  function rejectOrder(id) {
    axios.put(`http://localhost:3000/admin/orders/${id}/reject`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => alert("Order Rejected"))
  }
  
  const updateOrderStatus = async (id, status) => {
   
    console.log("STATUS SENT:", status); // 👈 MUST print approved/rejected
     // 🔥 Instant UI update
     setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
    
    try {
      const res = await API.patch(
        `http://localhost:3000/admin/orders/${id}`,
        {
          order: 
        { status: status }

        },
        

      );
     
     
    if (status === "approved") {
      alert("✅ Order approved successfully");
    } else {
      alert("❌ Order rejected");
    }
    } catch (err) {
      alert("Status update failed");

    }
  };
  
  
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");  // remove JWT token
    navigate("/register");   // redirect to login page
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin: {user.email}</p>
      <button onClick={handleLogout}>
        Logout
      </button>

     
        <div>
          <h2>All Orders</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td> {order.status}</td>
                    <td>{order.user_id}</td>
                    <button onClick={() => updateOrderStatus(order.id, "approved")}>Approve</button>
                    <button onClick={() =>updateOrderStatus(order.id,  "rejected")}>Reject</button>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </div>
  )};