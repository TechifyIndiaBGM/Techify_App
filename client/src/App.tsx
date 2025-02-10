import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Navbar from "@/components/navbar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: "url('https://i.ibb.co/k5QLwPH/islamic-pattern.png')",
            backgroundRepeat: 'repeat'
          }} 
        />
        <div className="relative z-10">
          <Navbar />
        <main>
          <Router />
        </main>
        <Toaster />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;