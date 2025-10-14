// this file will hold all the main project
const prisma = require("./prisma-client");

// add Income function
async function addIncome(amount, source, userId) {
  await prisma.Income.create({
    data: {
      amount: amount,
      source: source,
      userId: userId,
    },
  });
  console.log("Income added");
}
// expense adding function
async function addExpense(spent, purpose, userId) {
  await prisma.Expense.create({
    data: { spent: spent, purpose: purpose, userId: userId },
  });
  console.log("expense added");
}
// view financial summary
async function viewSummary(userId) {
  // total income  by user
  const totalIncome = await prisma.Income.aggregate({
    where: { userId: userId },
    _sum: { amount: true },
  });

  // total expense by user
  const totalExpense = await prisma.Expense.aggregate({
    where: { userId: userId },
    _sum: { spent: true },
  });
  //get balance
  const income = totalIncome._sum.amount;
  const expense = totalExpense._sum.spent;
  const balance = income - expense;
  //console
  console.log("total income", income);
  console.log("total expense", expense);
  console.log("current balance", balance);
}

// date based income expense range filtering
const filterByDate = async function (userId, startDate, endDate) {
  const incomeBydate = await prisma.Income.findMany({
    where: {
      userId: userId,
    },
    date: {
      gte: new Date(startDate),
      lte: new Date(endDate),
    },
  });

  const expenseByDate = await prisma.Expense.findMany({
    where: { userId: userId },
    date: {
      gte: new Date(startDate),
      lte: new Date(endDate),
    },
  });

  // console
  console.log("income", incomeBydate);
  console.log("expense", expenseByDate);
};
async function main() {
  // place for the prisma client queries
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
