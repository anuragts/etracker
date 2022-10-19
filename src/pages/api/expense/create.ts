// create  a new expense and push to database with following fields:
//   id Int @id @default(autoincrement())
//   name String
//   amount Float
//   date DateTime
//   category String
//   user User @relation(fields: [userId], references: [id])
//   userId Int

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, amount, category, userId } = req.body;
  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 10);
  const amountFloat = parseFloat(amount);
  const userIdInt = parseInt(userId);
  const expense = await prisma.expense.create({
    data: {
      name,
      amount: amountFloat,
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
