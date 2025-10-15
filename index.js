const prisma = require("./generated/prisma");
const prompts = require("prompts");

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
    data: { ...res },
  });
  console.log(`Income of ${res.amount} from ${res.source} has been added`);
};

//add expense
const addExpense = async function () {
  // input spent, purpose,date, userId
  const questions = [
    {
      type: "number",
      name: "spent",
      message: "Please enter the amount of expense: ",
    },
    {
      type: "text",
      name: "purpose",
      message: "Please enter the purpose of expense: ",
    },
    {
      type: "text",
      name: "date",
      message: "Please enter date(YYYY-MM-DD): ",
    },
    {
      type: "number",
      name: "userId",
      message: "Please enter user Id: ",
    },
  ];
  //prompts
  const exp = await prompts(questions);
  //save to database
  await prisma.Expense.create({
    data: { ...exp },
  });
  console.log(`Expense of ${exp.spent} from ${exp.purpose} has been added`);
};

//view summary

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
