import { MongoClient } from "mongodb";
const uri=process.env.MONGODB_URI;if(!uri) throw new Error("Set MONGODB_URI");
let client,clientPromise; if(process.env.NODE_ENV==="development"){ if(!global._mongo){client=new MongoClient(uri);global._mongo=client.connect();} clientPromise=global._mongo;} else {client=new MongoClient(uri);clientPromise=client.connect();}
export default clientPromise;
