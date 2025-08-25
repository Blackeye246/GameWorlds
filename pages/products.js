
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function Products(){
  const [items,setItems]=useState([]);
  useEffect(()=>{fetch('/api/products').then(r=>r.json()).then(setItems)},[]);
  return (
    <div>
      <Header/>
      <div className="container">
        <h1 className="text-2xl">Products</h1>
        <div className="grid" style={{marginTop:16}}>
          {items.map((p)=> (
            <div className="card" key={p._id}>
              <h3>{p.name}</h3>
              <p>Price: {p.price} ৳</p>
              <button className="btn btn-primary" onClick={()=>createOrder(p)}>Order</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  function createOrder(p){
    const qty = prompt('Quantity?', '1');
    if(!qty) return;
    fetch('/api/orders', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({productId: p._id, qty: Number(qty)})})
      .then(r=>r.json()).then(d=>{ if(d.error) alert(d.error); else alert('Order placed!'); });
  }
}
