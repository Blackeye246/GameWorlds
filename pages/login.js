
import { useState } from 'react';
import Header from '@/components/Header';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const submit=async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data = await res.json();
    if(data.error) return alert(data.error);
    location.href='/';
  }
  return (<div><Header/><div className="container" style={{maxWidth:420}}>
    <h1>Login</h1>
    <form onSubmit={submit} style={{display:'grid',gap:10}}>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="btn btn-primary">Login</button>
    </form>
  </div></div>)
}
