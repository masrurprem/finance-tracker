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
