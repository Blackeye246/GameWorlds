import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "সব তথ্য দিতে হবে" });

  try {
    const client = await clientPromise;
    const db = client.db("gameworlds");

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User পাওয়া যায়নি" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "ভুল পাসওয়ার্ড" });
    }

    return res.status(200).json({ message: "Login সফল হয়েছে", userId: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
