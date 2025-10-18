const prompts = require("prompts");
// view summary prompt
const summaryPrompt = {
  type: "number",
  name: "id",
  message: "your balance summary is one id away: ",
};
// total income by date prompt
const incomeByDatePrompt = [
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
];
// total expense by date prompt
expenseByDatePrompt = [
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
];

module.exports = { summaryPrompt, incomeByDatePrompt, expenseByDatePrompt };
