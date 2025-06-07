// src/app/actions.ts
"use server";

import { optimizeResumeContent, type OptimizeResumeContentInput, type OptimizeResumeContentOutput } from '@/ai/flows/optimize-resume-content';
import { z } from 'zod';

const OptimizeInputSchema = z.object({
  resumeContent: z.string().min(1, "Resume content cannot be empty."),
});

interface FormState {
  message: string;
  optimizedContent?: string;
  suggestions?: string[];
  fieldErrors?: Record<string, string[] | undefined>;
  type?: 'success' | 'error';
}

export async function handleOptimizeResume(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    resumeContent: formData.get('resumeContent') as string,
  };

  const validatedFields = OptimizeInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      type: 'error',
    };
  }

  try {
    const aiInput: OptimizeResumeContentInput = {
      resumeContent: validatedFields.data.resumeContent,
      // userId: "portfolio-user" // Optional: if you want to track usage
    };
    
    const result: OptimizeResumeContentOutput = await optimizeResumeContent(aiInput);

    if (result && result.optimizedContent) {
      return {
        message: "Resume content optimized successfully!",
        optimizedContent: result.optimizedContent,
        suggestions: result.suggestions,
        type: 'success',
      };
    } else {
      return {
        message: "AI optimization failed to produce content. Please try again.",
        type: 'error',
      };
    }
  } catch (error) {
    console.error("AI Optimization Error:", error);
    return {
      message: "An unexpected error occurred during AI optimization. Please try again later.",
      type: 'error',
    };
  }
}
