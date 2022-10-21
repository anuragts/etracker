import { useState } from "react";

export default function Login() {
  const [data, setData] = useState([]);

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
    const userId = y;
    console.log(userId)
    const parsedUserId = userId?.toString() || "";
    localStorage.setItem("userId", parsedUserId);
    console.log(result);
    let tmt = "";
    if (response.status === 200) {
      console.log("success");
      tmt = "loggedin";
    } else {
      console.log("failed");
      const tmt = "failed";
    }
    setData(y);
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
