'use server';
/**
 * @fileOverview An AI agent that generates basic website concepts and content suggestions
 *               based on business type and description.
 *
 * - generateAiWebsiteConcept - A function that handles the AI website concept generation process.
 * - AiWebsiteConceptGeneratorInput - The input type for the generateAiWebsiteConcept function.
 * - AiWebsiteConceptGeneratorOutput - The return type for the generateAiWebsiteConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiWebsiteConceptGeneratorInputSchema = z.object({
  businessType: z
    .string()
    .describe('The type of business (e.g., e-commerce store, local restaurant).'),
  businessDescription: z
    .string()
    .describe('A short description of the business and its offerings.'),
});
export type AiWebsiteConceptGeneratorInput = z.infer<
  typeof AiWebsiteConceptGeneratorInputSchema
>;

const AiWebsiteConceptGeneratorOutputSchema = z.object({
  websiteConcept: z
    .string()
    .describe('A high-level concept or theme for the website.'),
  contentSuggestions: z
    .array(z.string())
    .describe('Specific content ideas for different sections of the website.'),
});
export type AiWebsiteConceptGeneratorOutput = z.infer<
  typeof AiWebsiteConceptGeneratorOutputSchema
>;

export async function generateAiWebsiteConcept(
  input: AiWebsiteConceptGeneratorInput
): Promise<AiWebsiteConceptGeneratorOutput> {
  return aiWebsiteConceptGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiWebsiteConceptGeneratorPrompt',
  input: {schema: AiWebsiteConceptGeneratorInputSchema},
  output: {schema: AiWebsiteConceptGeneratorOutputSchema},
  prompt: `You are an AI assistant specialized in generating website concepts and content suggestions.

Based on the following business information, provide a high-level website concept and specific content suggestions for different sections of the website.

Business Type: {{{businessType}}}
Business Description: {{{businessDescription}}}

Consider common website sections like Hero, About Us, Services/Products, Testimonials, Contact, etc., when providing content suggestions.`,
});

const aiWebsiteConceptGeneratorFlow = ai.defineFlow(
  {
    name: 'aiWebsiteConceptGeneratorFlow',
    inputSchema: AiWebsiteConceptGeneratorInputSchema,
    outputSchema: AiWebsiteConceptGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
