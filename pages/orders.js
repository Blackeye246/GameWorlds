
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function Orders(){
  const [orders,setOrders]=useState([]);
  useEffect(()=>{fetch('/api/orders').then(r=>r.json()).then(d=>{ if(!d.error) setOrders(d);});},[]);
  return (
    <div>
      <Header/>
      <div className="container">
        <h1>My Orders</h1>
        <table className="table" style={{marginTop:12}}>
          <thead><tr><th>ID</th><th>Product</th><th>Qty</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o,i)=>(<tr key={i}><td>{i+1}</td><td>{o.productName}</td><td>{o.qty}</td><td>{o.status}</td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
