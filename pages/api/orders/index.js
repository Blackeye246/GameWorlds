
import clientPromise from "@/lib/mongodb";
import { requireUser } from "@/lib/auth";
import { ObjectId } from "mongodb";

export default async function handler(req,res){
  const client = await clientPromise;
  const db = client.db('GameWorlds');
  const user = requireUser(req,res); if(!user) return;

  if(req.method==='GET'){
    const items = await db.collection('orders').find({email:user.email}).sort({_id:-1}).toArray();
    res.json(items);
  } else if(req.method==='POST'){
    const {productId,qty}=req.body||{};
    if(!productId||!qty) return res.status(400).json({error:'Missing'});
    const product = await db.collection('products').findOne({_id:new ObjectId(productId)});
    if(!product) return res.status(400).json({error:'Invalid product'});
    const order = {email:user.email, productId, productName:product.name, qty, status:'pending', createdAt:new Date()};
    await db.collection('orders').insertOne(order);
    res.status(201).json(order);
  } else {
    res.status(405).end();
  }
}
