import { NextApiRequest,NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async function login(req:NextApiRequest,res:NextApiResponse) {
    const { email, password } = req.body;
    const exists = prisma.user.findMany({ where: { email } });
    if (!email || !password) {
        res.status(400).send("Please fill all fields");
    } else if ((await exists).length === 0) {
        res.status(400).send("User does not exist");
    } else {
        const user = await prisma.user.findMany({ where: { email } });
        res.status(200).json(user);
    }
}
