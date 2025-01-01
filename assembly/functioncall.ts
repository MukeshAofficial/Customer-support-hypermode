import { http, models } from "@hypermode/modus-sdk-as";
import { JSON } from "json-as";

import {
  AnthropicMessagesModel,
  Message,
  UserMessage,
  ToolChoiceTool,
} from "@hypermode/modus-sdk-as/models/anthropic/messages";

// This model name should match the one defined in the modus.json manifest file.
const modelName: string = "text-generator";

// Define Quote class to structure the quote data
@json
class Quote {
  @alias("q")
  quote!: string;

  @alias("a")
  author!: string;
}

// This function returns a default quote
export function getDefaultQuote(): string {
  // Return a default motivational quote
  return `"The only way to do great work is to love what you do." — Steve Jobs`;
}

// Function to generate a quote using the LLM (Language Model) - not used anymore
export function generateQuote(instruction: string, prompt: string): string {
  const model = models.getModel<AnthropicMessagesModel>(modelName);
  const messages: Message[] = [
    new UserMessage(instruction),
    new UserMessage(prompt),
  ];
  const input = model.createInput(messages);

  // For Anthropic, system is passed as parameter to the invoke, not as a message
  input.system = "You are a helpful assistant generating motivational quotes.";

  // Optional parameters
  input.temperature = 0.7;
  input.maxTokens = 100;

  // Invoke the model
  const output = model.invoke(input);

  if (output.content.length !== 1) {
    throw new Error("Unexpected output content length");
  }

  if (output.content[0].type === "text") {
    return output.content[0].text!.trim();
  }

  throw new Error("Unexpected content type: " + output.content[0].type);
}
