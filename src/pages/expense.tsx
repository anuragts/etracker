import { prisma } from "../db/client";

export default function expense(props:any){
return(
    <>
    <div>
        <h1>Expense</h1>
        {/* {props.expenses.map((expense:any) => (
            <div key={expense.id}>
                <div>{expense.name}</div>
                <div>{expense.amount}</div>
                <div>{expense.category}</div>
                </div>
        ))} */}
        {props.expenses}
        {props.expenses[0].name}
        {props.expenses[0].amount}
        {props.expenses[0].category}
    </div>
    </>
)
}

export const getServerSideProps = async () => {
    const expenses = await prisma.expense.findMany();

    return{
        props: {
            expenses:JSON.stringify(expenses),
        },
    }
}