
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export function signToken(payload){
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function parseUser(req){
  try{
    const cookies = cookie.parse(req.headers.cookie || '');
    if(!cookies.token) return null;
    const data = jwt.verify(cookies.token, process.env.JWT_SECRET);
    return data;
  }catch(e){ return null; }
}

export function requireUser(req, res){
  const user = parseUser(req);
  if(!user){ res.status(401).json({error:'Unauthorized'}); return null; }
  return user;
}

export function requireAdmin(req, res){
  const user = parseUser(req);
  if(!user){ res.status(401).json({error:'Unauthorized'}); return null; }
  if(user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL){ res.status(403).json({error:'Forbidden'}); return null; }
  return user;
}
