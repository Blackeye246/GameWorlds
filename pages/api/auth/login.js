
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import cookie from "cookie";

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const {email,password}=req.body||{};
  const client = await clientPromise;
  const db = client.db('GameWorlds');
  const user = await db.collection('users').findOne({email});
  if(!user) return res.status(400).json({error:'Invalid email or password'});
  const ok = await bcrypt.compare(password,user.password);
  if(!ok) return res.status(400).json({error:'Invalid email or password'});
  const token = signToken({email:user.email,name:user.name,isAdmin: (process.env.NEXT_PUBLIC_ADMIN_EMAIL===user.email)});
  res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly:true, path:'/', maxAge: 60*60*24*7, sameSite:'lax', secure: process.env.NODE_ENV==='production' }));
  res.json({ok:true});
}
