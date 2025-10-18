const prisma = require("../prisma-client");

// total income by date range based filtering
const totalIncomeByDate = async function (userId, start, end) {
  const income = await prisma.Income.aggregate({
    where: {
      userId,
      date: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
    _sum: { amount: true },
  });
  // return data to user
  console.log(`Total income from ${start} to ${end}: ${income._sum.amount}`);
};

module.exports = totalIncomeByDate;
