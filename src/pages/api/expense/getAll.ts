import { NextApiRequest,NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async function getAll(req:NextApiRequest,res:NextApiResponse) {
    const { userId } = req.body;

    const userIdInt = parseInt(userId);

    const expense = await prisma.expense.findMany({
        // fetch all expense with userid
        where:{
            userId:userIdInt
        }
    })
    return res.status(200).json(expense);
}