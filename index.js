const prisma = require("./prisma-client");
const prompts = require("prompts");
// import feature functions
const addIncome = require("./features/add-income");
const addExpense = require("./features/add-expense");
const viewSummary = require("./features/view-summary");
const totalIncomeByDate = require("./features/total-income-by-date");
const totalExpenseByDate = require("./features/total-expense-by-date");

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
