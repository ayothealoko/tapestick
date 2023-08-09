import { prisma } from "./index.js";
interface CreateUser {
  email: string;
  name: string;
  hash: string;
}

export async function createUserModel(user: CreateUser) {
  return await prisma.person.create({
    data: {
      name: user.name,
      email: user.email,
      hash: user.hash,
      apiKey: {
        create: {
          isValid: true,
        },
      },
    },
  });
}
