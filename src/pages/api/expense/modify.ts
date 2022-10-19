import { NextApiRequest,NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async function modify(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const { id, name, amount, category } = req.body;
    const parsedId = parseInt(id);
    const amountFloat = parseFloat(amount);
    const exists = prisma.expense.findMany({ where: { id:parsedId } });
    if ((await exists).length > 0) {
        const modifiedExpense = await prisma.expense.update({
        where: {
            id: parsedId,
        },
        data: {
            name,
            amount: amountFloat,
            category,
        },
        });
        res.status(200).json(modifiedExpense);
    } else {
        res.status(400).send("Expense does not exist");
    }
    }