const prisma = require("../prisma-client");
//total Expense by date range based filtering
const totalExpenseByDate = async function (userId, start, end) {
  const expense = await prisma.Expense.aggregate({
    where: {
      userId,
      date: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
    _sum: { spent: true },
  });
  // return data to the user
  console.log(`Total expense from ${start} to ${end}: ${expense._sum.spent}`);
};
module.exports = totalExpenseByDate;
