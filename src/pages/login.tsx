import { useState } from "react";
import getId from "./getId";
export default function Login() {
  const [data, setData] = useState([]);
  const id = getId();
  if (typeof window !== "undefined") {
    if ( id !== "") {
      window.location.href = "/expense";
    }
}
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: dataObj.email,
        password: dataObj.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    const y = result[0].id;
    const parsedUserId = y?.toString() || null;
    localStorage.setItem("userId", parsedUserId);
    setData(parsedUserId)
    console.log(result);
    if (response.status === 200) {
      console.log("success");
      window.location.href = "/expense";
    } else {
      console.log("failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <p>{data}</p>
    </div>
  );
}
