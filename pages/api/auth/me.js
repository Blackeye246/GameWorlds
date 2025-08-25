
import { parseUser } from "@/lib/auth";
export default function handler(req,res){
  const user = parseUser(req);
  if(!user) return res.json({});
  res.json(user);
}
