import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcryptjs");
import { prisma } from "../../../db/client";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password, password2 } = req.body;
  const exists = prisma.user.findMany({ where: { email } });

  if (!name || !email || !password) {
    res.status(400).send("Please fill all fields");
  } else if ((await exists).length > 0) {
    res.status(400).send("User already exists");
  } else if (password !== password2) {
    res.status(400).send("Passwords do not match");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json([user.email, user.name]);
  }
}
