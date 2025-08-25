
import clientPromise from "@/lib/mongodb";

export default async function handler(req,res){
  const client = await clientPromise;
  const db = client.db('GameWorlds');
  if(req.method==='GET'){
    const doc = await db.collection('settings').findOne({_id:'site'}) || { _id:'site', online:true, notice:'' };
    res.json({ online: doc.online, notice: doc.notice });
  } else if(req.method==='POST'){
    const {online, notice} = req.body||{};
    await db.collection('settings').updateOne({_id:'site'}, {$set:{online, notice}}, {upsert:true});
    res.json({ok:true});
  } else {
    res.status(405).end();
  }
}
