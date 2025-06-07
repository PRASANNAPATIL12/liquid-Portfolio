'use server';

/**
 * @fileOverview AI flow to optimize the presentation of resume content for maximum user engagement.
 *
 * - optimizeResumeContent - A function that optimizes the resume content.
 * - OptimizeResumeContentInput - The input type for the optimizeResumeContent function.
 * - OptimizeResumeContentOutput - The return type for the optimizeResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeResumeContentInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The complete resume content as a string.'),
  userId: z.string().optional().describe('The ID of the user, if available.'),
});
export type OptimizeResumeContentInput = z.infer<
  typeof OptimizeResumeContentInputSchema
>;

const OptimizeResumeContentOutputSchema = z.object({
  optimizedContent: z
    .string()
    .describe('The optimized resume content, with adjusted fonts, text sizes, and highlighted key data.'),
  suggestions: z
    .array(z.string())
    .describe('Specific suggestions for further optimizing the resume.'),
});
export type OptimizeResumeContentOutput = z.infer<
  typeof OptimizeResumeContentOutputSchema
>;

export async function optimizeResumeContent(
  input: OptimizeResumeContentInput
): Promise<OptimizeResumeContentOutput> {
  return optimizeResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumeContentPrompt',
  input: {schema: OptimizeResumeContentInputSchema},
  output: {schema: OptimizeResumeContentOutputSchema},
  prompt: `You are an AI resume optimization expert. You will receive resume content and provide an optimized version designed to maximize user engagement and appeal.  Consider adjusting fonts, text sizes, and highlighting key data.

  Resume Content: {{{resumeContent}}}

  Instructions: Optimize the resume content as requested. Also provide a list of specific suggestions for further optimization.
  Please provide the optimized resume and list of suggestions in the output schema format.
  User ID (if available): {{{userId}}}
  `,
});

const optimizeResumeContentFlow = ai.defineFlow(
  {
    name: 'optimizeResumeContentFlow',
    inputSchema: OptimizeResumeContentInputSchema,
    outputSchema: OptimizeResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
