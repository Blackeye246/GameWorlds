
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function Home(){
  const [settings,setSettings]=useState(null);
  useEffect(()=>{fetch('/api/admin/site').then(r=>r.json()).then(setSettings).catch(()=>{});},[]);
  return (
    <div>
      <Header/>
      <div className="container">
        {settings?.notice && <div className="notice">{settings.notice}</div>}
        <h1 style={{fontSize:28,marginBottom:10}}>Welcome to GameWorlds 🎮</h1>
        <p>Top-up Free Fire Diamonds, PUBG UC, COD Points, plus Netflix & YouTube Premium.</p>
        <div className="grid" style={{marginTop:20}}>
          {[
            {name:'Free Fire Diamonds',slug:'free-fire',price:90},
            {name:'PUBG UC',slug:'pubg',price:120},
            {name:'Call of Duty CP',slug:'cod',price:150},
            {name:'Netflix Premium',slug:'netflix',price:250},
            {name:'YouTube Premium',slug:'youtube',price:180}
          ].map((p,i)=>(
            <div className="card" key={i}>
              <h3>{p.name}</h3>
              <div className="badge" style={{margin:'8px 0'}}>Starts from {p.price} ৳</div>
              <a className="btn btn-primary" href="/products">Buy</a>
            </div>
          ))}
        </div>
      </div>
      <div className="footer">© {new Date().getFullYear()} GameWorlds</div>
    </div>
  )
}
