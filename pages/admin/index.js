
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function Admin(){
  const [users,setUsers]=useState([]);
  const [products,setProducts]=useState([]);
  const [notice,setNotice]=useState('');
  const [online,setOnline]=useState(true);

  useEffect(()=>{
    refresh();
  },[]);

  function refresh(){
    fetch('/api/admin/users').then(r=>r.json()).then(d=>setUsers(d||[]));
    fetch('/api/products').then(r=>r.json()).then(d=>setProducts(d||[]));
    fetch('/api/admin/site').then(r=>r.json()).then(d=>{ if(d){ setNotice(d.notice||''); setOnline(d.online!==false);} });
  }

  const addProduct=async()=>{
    const name = prompt('Product name?');
    const price = Number(prompt('Price?'));
    if(!name||!price) return;
    await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,price})});
    refresh();
  }

  const toggleOnline=async()=>{
    await fetch('/api/admin/site',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({online:!online, notice})});
    setOnline(!online);
  }

  const saveNotice=async()=>{
    await fetch('/api/admin/site',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({online, notice})});
    alert('Saved');
  }

  return (
    <div>
      <Header/>
      <div className="container">
        <h1>Admin Panel</h1>
        <div className="card" style={{marginTop:12}}>
          <div className="switch">
            <span>Status:</span>
            <span className="badge">{online?'ONLINE':'OFFLINE'}</span>
            <button className="btn" onClick={toggleOnline}>Toggle</button>
          </div>
          <div style={{marginTop:10}}>
            <input className="input" placeholder="Notice for users..." value={notice} onChange={e=>setNotice(e.target.value)} />
            <button className="btn btn-primary" style={{marginTop:8}} onClick={saveNotice}>Save</button>
          </div>
        </div>

        <h2 style={{marginTop:20}}>Products</h2>
        <button className="btn btn-primary" onClick={addProduct}>+ Add Product</button>
        <table className="table" style={{marginTop:10}}>
          <thead><tr><th>Name</th><th>Price</th></tr></thead>
          <tbody>{products.map((p,i)=>(<tr key={i}><td>{p.name}</td><td>{p.price}</td></tr>))}</tbody>
        </table>

        <h2 style={{marginTop:20}}>Users</h2>
        <table className="table" style={{marginTop:10}}>
          <thead><tr><th>Name</th><th>Email</th></tr></thead>
          <tbody>{users.map((u,i)=>(<tr key={i}><td>{u.name}</td><td>{u.email}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  )
}
