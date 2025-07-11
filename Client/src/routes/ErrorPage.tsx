import { useRouteError } from 'react-router-dom';

type RouteError = {
  statusText?: string;
  message?: string;
  status?: number;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  let title = 'Something went wrong';
  let description = 'An unexpected error occurred. Please try again later.';

  if (error.status === 404) {
    title = 'Page not found';
    description = 'The page you are looking for does not exist.';
  }

  const errorMessage = error.statusText || error.message || 'Unknown error';

  return (
    <div className="flex flex-col min-h-[60vh] items-center justify-center py-20 bg-muted/50 animate-fade-in">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{description}</p>
      <p className="text-sm text-muted-foreground">{errorMessage}</p>
    </div>
  );
}
