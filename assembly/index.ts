export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}
export * from "./quotes";

import { models } from "@hypermode/modus-sdk-as";


import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";

// In this example, we will generate text using the OpenAI Chat model.
// See https://platform.openai.com/docs/api-reference/chat/create for more details
// about the options available on the model, which you can set on the input object.

// This model name should match the one defined in the modus.json manifest file.
const modelName: string = "text-generator";

// This function generates some text based on the instruction and prompt provided.
export function generateText(instruction: string, prompt: string): string {
  // The imported ChatModel interface follows the OpenAI Chat completion model input format.
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  // This is one of many optional parameters available for the OpenAI Chat model.
  input.temperature = 0.7;

  // Here we invoke the model with the input we created.
  const output = model.invoke(input);

  // The output is also specific to the ChatModel interface.
  // Here we return the trimmed content of the first choice.
  return output.choices[0].message.content.trim();
}