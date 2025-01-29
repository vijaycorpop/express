'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Something went wrong!</h1>
        <p className="mb-8 text-muted-foreground">
          We apologize for the inconvenience. Please try again later.
        </p>
        <Button
          onClick={() => reset()}
          className="mx-auto"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
