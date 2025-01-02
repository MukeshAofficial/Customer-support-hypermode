import { generateText } from "./index"; 
/**
 * Generates a basic HTML structure for a website based on the provided title.
 * @param {string} websiteTitle - The title of the website.
 * @returns {string} - The generated HTML code as a string.
 */
export function generateWebsiteCode(websiteTitle: string): string {
  // Instruction for the model
  const instruction = "Write a basic HTML and CSS code for a website with the following title.";

  // Prompt describing the task
  const prompt = `Title: ${websiteTitle}\n\nGenerate a simple HTML structure with embedded CSS.`;

  // Generate the code using the generateText function
  const generatedCode = generateText(instruction, prompt);

  return generatedCode;
}