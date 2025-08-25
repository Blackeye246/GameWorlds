
import clientPromise from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req,res){
  const admin = requireAdmin(req,res); if(!admin) return;
  const client = await clientPromise;
  const db = client.db('GameWorlds');
  const users = await db.collection('users').find({}, {projection:{password:0}}).toArray();
  res.json(users);
}
