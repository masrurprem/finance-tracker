const prisma = require("./prisma-client");
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
    4. Total Income by Date
    5. Total Expense by Date
    6. Exit!
    Please enter your choice(1-6):
    `,
      validate: (opt) =>
        [1, 2, 3, 4, 5, 6].includes(opt) ? true : "choose option(1-6)",
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
    } else if (choice === 4) {
      // get user id to fetch its total income by date
      const user = await prompts([
        {
          type: "number",
          name: "id",
          message: "please enter user id: ",
        },
        {
          type: "text",
          name: "start",
          message: "please enter start date(Y-M-D): ",
        },
        {
          type: "text",
          name: "end",
          message: "please enter end date(Y-M-D): ",
        },
      ]);
      // now fetch total income from data
      await totalIncomeByDate(user.id, user.start, user.end);
    } else if (choice === 5) {
      // get user id to fetch its total income by date
      const user = await prompts([
        {
          type: "number",
          name: "id",
          message: "please enter user id: ",
        },
        {
          type: "text",
          name: "start",
          message: "please enter start date(Y-M-D): ",
        },
        {
          type: "text",
          name: "end",
          message: "please enter end date(Y-M-D): ",
        },
      ]);
      // now fetch total income from data
      await totalExpenseByDate(user.id, user.start, user.end);
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
