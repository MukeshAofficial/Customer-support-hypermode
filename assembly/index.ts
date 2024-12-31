export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}
export * from "./quotes";
export * from "./scrape";
export * from "./stock";

import { collections } from "@hypermode/modus-sdk-as"

import { models } from "@hypermode/modus-sdk-as";
import { EmbeddingsModel } from "@hypermode/modus-sdk-as/models/experimental/embeddings";

const textsCollection = "texts"
const searchMethod = "searchMethod1"
const embeddingModelName = "minilm"


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


export function upsertTexts(ids: string[], texts: string[]): string[] {
  const errors: string[] = []

  if (ids.length !== texts.length) {
    errors.push("Length of all arrays must be the same")
    return errors
  }

  let result = collections.upsertBatch(textsCollection, ids, texts)

  if (!result.isSuccessful) {
    errors.push(result.error)
    return errors
  }

  return ids
}

/**
 * Perform a vector search using an embedding of the input string
 */
export function search(query: string): string[] {
  const searchResults = collections.search(textsCollection, searchMethod, query, 10, true)

  if (!searchResults.isSuccessful) {
    return [searchResults.error]
  }
  const searchTexts: string[] = []

  for (let i = 0; i < searchResults.objects.length; i++) {
    const obj = searchResults.objects[i]
    const text = collections.getText(textsCollection, obj.key)
    if (text) {
      searchTexts.push(text)
    }
  }
  return searchTexts
}

export function miniLMEmbed(texts: string[]): f32[][] {

  const model = models.getModel<EmbeddingsModel>("minilm");
  const input = model.createInput(texts);
  const output = model.invoke(input);
  return output.predictions;
}

