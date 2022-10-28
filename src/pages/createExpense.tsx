import getId from "./getId";
export default  function createExpense() {
  const id = getId();

  if (id === null || id === "") {
    window.location.href = "/login";
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    const response = await fetch("/api/expense/create", {
      method: "POST",
      body: JSON.stringify({
        userId: id,
        amount: dataObj.amount,
        name: dataObj.name,
        category: dataObj.category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    const g = result[0].name;
    console.log(g);
    if (response.status === 200) {
        console.log("success");
    } else {
        console.log("failed");
    }
  };

    return (
      <div>
        <h1>Expense</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" id="amount" />
          <label htmlFor="category">Category</label>
          <input type="text" name="category" id="category" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

