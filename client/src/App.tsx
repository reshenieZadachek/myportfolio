import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "./context/LanguageContext";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "@/pages/not-found";
import BaseRouter from "./lib/wouter-base-path";

function Router() {
  return (
    <BaseRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/project/:id" component={ProjectDetail} />
        <Route component={NotFound} />
      </Switch>
    </BaseRouter>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {loading ? (
          <Preloader />
        ) : (
          <>
            <CustomCursor />
            <Header />
            <Router />
            <Footer />
          </>
        )}
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
