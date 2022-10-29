import getId from "./getId";
import { useState } from "react";

export default function Expense() {
  const [name, setName] = useState([]);
  const [amount, setAmount] = useState([]);
  const [category, setCategory] = useState([]);
  const id = getId();

  // if (id === null || id === "") {
  //   window.location.href = "/login";
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/expense/getAll", {
      method: "POST",
      body: JSON.stringify({
        userId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    const n = result[0].name;
    const a = result[0].amount;
    const c = result[0].category;
    
    if (response.status === 200) {
      console.log("success");
    } else {
      console.log("failed");
    }
    setName(n);
    setAmount(a);
    setCategory(c);
      };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Get Expense</button>
        <div>name - {name}</div>
        <div>amount - {amount}</div>
        <div>category - {category}</div>
      </form>
    </div>
  );
}
