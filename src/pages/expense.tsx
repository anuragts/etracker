import { prisma } from "../db/client";

export default function expense(props:any){
return(
    <>
    <div>
        <h1>Expense</h1>
        {props.expenses}
        {props.expenses.name}
      
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