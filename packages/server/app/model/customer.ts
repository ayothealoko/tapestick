import { Customer } from "@prisma/client";
import { prisma } from "./index.js";

export async function createCustomerModel(
  customerName: string,
  userId: string
): Promise<Customer> {
  return await prisma.customer.create({
    data: {
      name: customerName,
      personId: userId,
    },
  });
}

export async function getCustomerModelByCuid(
  customerCuid: string
): Promise<Customer> {
  return await prisma.customer.findUnique({
    where: {
      customerCuid,
    },
  });
}

export async function getCustomerModelById(
  customerId: string
): Promise<Customer> {
  return await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });
}
