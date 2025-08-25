
import cookie from "cookie";
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  res.setHeader('Set-Cookie', cookie.serialize('token','',{path:'/',maxAge:0}));
  res.json({ok:true});
}
