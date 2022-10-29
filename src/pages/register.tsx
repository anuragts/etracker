import { useState } from "react";
import getId from "./getId";
export default function Register() {
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

    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        name: dataObj.name,
        email: dataObj.email,
        password: dataObj.password,
        password2: dataObj.password2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    const y = result[0].id;
    const parsedUserId = y?.toString() || null;
    localStorage.setItem("userId", parsedUserId);
    setData(parsedUserId);
    console.log(result);
    if (response.status === 200) {
      console.log("success");
      window.location.href = "/expense";
    } else {
      console.log("failed");
    }
  };
  return (
    <>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" id="password2" />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
