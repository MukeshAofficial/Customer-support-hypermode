import { models } from "@hypermode/modus-sdk-as";
import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";

// Model names for agents (can use the same model or different ones for each agent)
const marketResearchModelName: string = "text-generator";
const uiUxModelName: string = "text-generator";
const generalOutputModelName: string = "text-generator";

// Function for Market Research Agent
export function marketResearchAgent(websiteIdea: string): string {
  const instruction = "You are a market research agent. Provide market research insights for this website idea.";
  const prompt = `Website Idea: ${websiteIdea}`;
  
  return generateText(marketResearchModelName, instruction, prompt);
}

// Function for UI/UX Agent
export function uiUxAgent(marketResearchOutput: string): string {
  const instruction = "You are a UI/UX design agent. Based on the market research, provide UI/UX suggestions.";
  const prompt = `Market Research Insights: ${marketResearchOutput}`;
  
  return generateText(uiUxModelName, instruction, prompt);
}

// Function for General Output Agent
export function generalOutputAgent(uiUxOutput: string): string {
  const instruction = "You are a general output agent. Summarize all insights and provide recommendations.";
  const prompt = `UI/UX Suggestions: ${uiUxOutput}`;
  
  return generateText(generalOutputModelName, instruction, prompt);
}

// Function to generate text using a specific model
export function generateText(modelName: string, instruction: string, prompt: string): string {
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.7;

  const output = model.invoke(input);
  return output.choices[0].message.content.trim();
}

// Main function chaining the agents
export function agenticAI(websiteIdea: string): string {
  // Step 1: Market Research Agent
  const marketResearchOutput = marketResearchAgent(websiteIdea);
  console.log("Market Research Output:");
  console.log(marketResearchOutput);

  // Step 2: UI/UX Agent
  const uiUxOutput = uiUxAgent(marketResearchOutput);
  console.log("\nUI/UX Agent Output:");
  console.log(uiUxOutput);

  // Step 3: General Output Agent
  const generalOutput = generalOutputAgent(uiUxOutput);
  console.log("\nGeneral Output Agent Output:");
  console.log(generalOutput);

  // Final Output
  console.log("\nFinal Output:");
  console.log(generalOutput);

  return generalOutput;
}
