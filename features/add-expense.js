const prisma = require("../prisma-client");
const prompts = require("prompts");

// add expense function
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

module.exports = addExpense;
