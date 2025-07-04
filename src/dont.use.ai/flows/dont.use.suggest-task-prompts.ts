// This is an autogenerated file from Firebase Studio.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting common tasks based on the client and location.
 *
 * - suggestTaskPrompts - A function that takes client and location as input and returns a list of suggested tasks.
 * - SuggestTaskPromptsInput - The input type for the suggestTaskPrompts function.
 * - SuggestTaskPromptsOutput - The output type for the suggestTaskPrompts function.
 */

//import {ai} from '@/ai/genkit';
//import {z} from 'genkit';

const SuggestTaskPromptsInputSchema = z.object({
  client: z.string().describe('The name of the client.'),
  location: z.string().describe('The location of the job site.'),
});
export type SuggestTaskPromptsInput = z.infer<typeof SuggestTaskPromptsInputSchema>;

const SuggestTaskPromptsOutputSchema = z.object({
  suggestedTasks: z.array(z.string()).describe('A list of suggested tasks based on the client and location.'),
});
export type SuggestTaskPromptsOutput = z.infer<typeof SuggestTaskPromptsOutputSchema>;

export async function suggestTaskPrompts(input: SuggestTaskPromptsInput): Promise<SuggestTaskPromptsOutput> {
  return suggestTaskPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPromptsPrompt',
  input: {schema: SuggestTaskPromptsInputSchema},
  output: {schema: SuggestTaskPromptsOutputSchema},
  prompt: `You are an expert in field service tasks. Based on the client "{{client}}" and location "{{location}}", suggest a list of common tasks that a technician might perform. Return the tasks as a JSON array of strings.\n\nExample Output:\n{
  "suggestedTasks": ["Install new equipment", "Perform routine maintenance", "Troubleshoot issues", "Repair equipment"]
}`,
});

const suggestTaskPromptsFlow = ai.defineFlow(
  {
    name: 'suggestTaskPromptsFlow',
    inputSchema: SuggestTaskPromptsInputSchema,
    outputSchema: SuggestTaskPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
