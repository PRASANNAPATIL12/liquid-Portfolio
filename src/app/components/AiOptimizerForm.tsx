"use client";

import type { FC } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import { handleOptimizeResume } from '@/app/actions';

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow-primary"
    >
      {pending ? (
        <><Lightbulb className="mr-2 h-4 w-4 animate-spin" />Optimizing...</>
      ) : (
        <><Lightbulb className="mr-2 h-4 w-4" />Optimize Content</>
      )}
    </Button>
  );
}

const AiOptimizerForm: FC = () => {
  const [state, formAction] = useFormState(handleOptimizeResume, initialState);

  return (
    <section id="ai-optimizer" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-accent/50 shadow-neon-accent">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl md:text-4xl text-accent">AI Content Optimizer</CardTitle>
          <CardDescription className="text-muted-foreground">
            Paste your resume section (e.g., experience, project description) below to get AI-powered suggestions for improvement.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div>
              <Textarea
                name="resumeContent"
                placeholder="Paste your content here..."
                rows={8}
                className="bg-background/70 border-primary/50 focus:border-accent focus:ring-accent"
                aria-label="Resume content to optimize"
              />
              {state.fieldErrors?.resumeContent && (
                <p className="text-sm text-destructive mt-1">{state.fieldErrors.resumeContent.join(', ')}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>

        {state.message && (
          <div className="p-4_mt-4">
            <Alert variant={state.type === 'error' ? 'destructive' : 'default'} className={state.type === 'success' ? 'border-primary text-primary' : ''}>
              {state.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{state.type === 'success' ? 'Success!' : 'Notification'}</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {state.optimizedContent && (
          <div className="p-4 mt-4 space-y-4">
            <div>
              <h4 className="font-headline text-lg text-primary mb-2">Optimized Content:</h4>
              <div className="p-3 border border-primary/50 rounded-md bg-background/50 whitespace-pre-wrap text-sm">
                {state.optimizedContent}
              </div>
            </div>
            {state.suggestions && state.suggestions.length > 0 && (
              <div>
                <h4 className="font-headline text-lg text-primary mb-2">Suggestions:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {state.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Card>
    </section>
  );
};

export default AiOptimizerForm;
