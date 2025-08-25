
import clientPromise from "@/lib/mongodb";
import { requireAdmin, requireUser } from "@/lib/auth";
import { ObjectId } from "mongodb";

export default async function handler(req,res){
  const client = await clientPromise;
  const db = client.db('GameWorlds');
  if(req.method==='GET'){
    const items = await db.collection('products').find({}).toArray();
    res.json(items);
  } else if(req.method==='POST'){
    const admin = requireAdmin(req,res); if(!admin) return;
    const {name,price}=req.body||{};
    if(!name||!price) return res.status(400).json({error:'Missing'});
    await db.collection('products').insertOne({name,price,createdAt:new Date()});
    res.status(201).json({ok:true});
  } else {
    res.status(405).end();
  }
}
