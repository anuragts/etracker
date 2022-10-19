import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, amount, category, userId } = req.body;
  const currentDate = new Date();
  const amountFloat = parseFloat(amount);
  const userIdInt = parseInt(userId);
  const expense = await prisma.expense.create({
    data: {
      name,
      amount: amountFloat,
      date:currentDate,
      category,
      user: {
        connect: {
          id: userIdInt,
        },
      },
    },
  });
  res.status(201).json(expense);
}
