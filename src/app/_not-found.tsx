export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground mt-4 text-lg">Page not found</p>
      <a href="/" className="text-primary mt-6 hover:underline">
        Return Home
      </a>
    </div>
  );
}
