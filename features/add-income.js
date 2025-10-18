const prisma = require("../prisma-client");
const prompts = require("prompts");
// add income function
// add income
const addIncome = async function () {
  // take input amount, source, date, userId from user
  const questions = [
    {
      type: "number",
      name: "amount",
      message: "please enter the amount of income: ",
    },
    {
      type: "text",
      name: "source",
      message: "please enter the source of income: ",
    },
    {
      type: "text",
      name: "date",
      message: "please enter the date(YYYY-MM-DD): ",
    },
    {
      type: "number",
      name: "userId",
      message: "please enter user id: ",
    },
  ];
  // ans obj via prompts
  const res = await prompts(questions);

  // save to database
  await prisma.Income.create({
    data: {
      amount: res.amount,
      source: res.source,
      date: new Date(res.date),
      userId: res.userId,
    },
  });
  console.log(`Income of ${res.amount} from ${res.source} has been added`);
};

module.exports = addIncome;
