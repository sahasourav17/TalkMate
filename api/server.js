const express = require("express");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config({ path: "./.env" });
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const app = express();
const port = 3000;
app.use(express.json());

app.post("/", async (req, res) => {
  textInput = req.body.textInput;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: textInput }],
    });
    res.send(response.data.choices[0].message.content);
  } catch (err) {
    res.send("Something error occured");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
