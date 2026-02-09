import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { useState, useEffect } from "react";
import type { Route } from "./+types/root";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Weather App</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  const [units, setUnits] = useState<'metric' | 'imperial' | 'standard'>('metric');

  // Load units from localStorage on mount
  useEffect(() => {
    const savedUnits = localStorage.getItem('weatherUnits') as 'metric' | 'imperial' | 'standard';
    if (savedUnits) {
      setUnits(savedUnits);
    }
  }, []);

  const handleUnitsChange = (newUnits: 'metric' | 'imperial' | 'standard') => {
    setUnits(newUnits);
    localStorage.setItem('weatherUnits', newUnits);
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-sunset-gradient">
      <Navigation units={units} onUnitsChange={handleUnitsChange} />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-16 max-w-[1600px] w-full mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-sunset-orange">
        {message}</h1>
      <p className="text-warm-brown text-lg">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}