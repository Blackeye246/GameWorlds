import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br/>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} /><br/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br/>
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
