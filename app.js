const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
async function main() {
  // all the prisma client queries will be written here
  // create some new users
  //   await prisma.User.createMany({
  //     data: [
  //       { name: "prem", email: "prem@example.com" },
  //       { name: "masrur", email: "mas@yahoo.com" },
  //       { name: "alam", email: "alam@gmail.com" },
  //       { name: "johndoe", email: "doe@john.com" },
  //     ],
  //   });
  // read all the users from User table
  //   const allUsers = await prisma.User.findMany();
  //   console.log(allUsers);
  /// creating income for user-1
  //   await prisma.income.create({
  //     data: { amount: 12.2, source: "eid bonus", userId: 1 },
  //   });
  /// get all users with income
  //   const userIncome = await prisma.user.findMany({
  //     include: {
  //       Income: true,
  //     },
  //   });

  //console.log(userIncome);
  //console.dir(userIncome, { depth: null });
  /// add data to the expense table
  await prisma.Expense.createMany({
    data: {
      spent: 8.0,
      purpose: "bought shoes",
      userId: 1,
    },
  });
  const expense = await prisma.Expense.findMany();
  console.log(expense);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
