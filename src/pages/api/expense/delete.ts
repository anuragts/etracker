import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function deleteExpense(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  const parsedId = parseInt(id);
  const exists = prisma.expense.findMany({ where: { id:parsedId } });
  if ((await exists).length > 0) {
    const deletedExpense = await prisma.expense.delete({
      where: {
        id: parsedId,
      },
    });
    res.status(200).json(`${deletedExpense.name} expense deleted`);
  } else {
    res.status(400).send("Expense does not exist");
  }
}
