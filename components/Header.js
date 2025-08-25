
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header(){
  const [me,setMe]=useState(null);
  useEffect(()=>{fetch('/api/auth/me').then(r=>r.json()).then(setMe).catch(()=>{});},[]);
  const logout=async()=>{await fetch('/api/auth/logout',{method:'POST'});location.href='/';}
  return (
    <header className="header">
      <div className="brand">
        <img src="/logo.png" alt="logo" onError={(e)=>{e.currentTarget.style.display='none'}}/>
        <Link href="/"><b>GameWorlds</b></Link>
      </div>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {me?.email ? (<>
          <Link href="/orders">My Orders</Link>
          <button className="btn" onClick={logout}>Logout</button>
          {me.isAdmin && <Link href="/admin">Admin</Link>}
        </>) : (<>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>)}
      </nav>
    </header>
  )
}
