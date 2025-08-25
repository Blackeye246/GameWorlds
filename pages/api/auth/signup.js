import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "সব তথ্য দিতে হবে" });

  try {
    const client = await clientPromise;
    const db = client.db("gameworlds");

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "এই ইমেইল আগে ব্যবহার হয়েছে" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Account তৈরি হয়েছে", userId: result.insertedId });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
