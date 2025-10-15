const prisma = require("./prisma-client");
const prompts = require("prompts");
const readlineSync = require("readline-sync");

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
    data: {
      spent: exp.spent,
      purpose: exp.purpose,
      date: new Date(exp.date),
      userId: exp.userId,
    },
  });
  console.log(`Expense of ${exp.spent} from ${exp.purpose} has been added`);
};

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

async function main() {
  console.log("Welcome to Personal Finance Tracker!");
  console.log(" What would you like to do?");
  // place for the prisma client queries

  while (true) {
    const menu = {
      type: "number",
      name: "choice",
      message: `
    1. Add Income
    2. Add Expense
    3. View Financial Summary
    4. Exit!
    Please enter your choice(1-4):
    `,
      validate: (opt) =>
        [1, 2, 3, 4].includes(opt) ? true : "choose option(1-4)",
    };
    // fetch user choice
    const { choice } = await prompts(menu);
    if (choice === 1) {
      // add income
      await addIncome();
    } else if (choice === 2) {
      //add expense
      await addExpense();
    } else if (choice === 3) {
      // summary
      const response = await prompts({
        type: "number",
        name: "id",
        message: "your balance summary is one id away: ",
      });

      await viewSummary(response.id);
    } else {
      console.log("Goodbye! Thanks for using Personal Finance Tracker.");
      break;
    }
  }
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
