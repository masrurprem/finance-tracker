const prisma = require("../prisma-client");

//view summary of an user
const viewSummary = async function (userId) {
  //total income
  const income = await prisma.Income.aggregate({
    where: { userId },
    _sum: { amount: true },
  });

  // total expenditure
  const expense = await prisma.Expense.aggregate({
    where: { userId },
    _sum: { spent: true },
  });
  // balance
  const balance = income._sum.amount - expense._sum.spent;
  console.log(`current account balance of user ${userId} is, ${balance}`);
};
module.exports = viewSummary;
