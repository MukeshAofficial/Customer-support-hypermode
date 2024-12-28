export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}
export * from "./quotes";

import { models } from "@hypermode/modus-sdk-as";
import { EmbeddingsModel } from "@hypermode/modus-sdk-as/models/experimental/embeddings";



import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";



const modelName: string = "text-generator";

export function generateText(instruction: string, prompt: string): string {
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.7;

  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}


export function testEmbeddingsWithMiniLM(texts: string[]): f32[][] {

  const model = models.getModel<EmbeddingsModel>("minilm");
  const input = model.createInput(texts);
  const output = model.invoke(input);
  return output.predictions;
}