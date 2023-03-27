import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { stdout } from "process";
import readline from "readline";

config();
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  console.log(response.data.choices[0].message.content);
  userInterface.prompt();
});
