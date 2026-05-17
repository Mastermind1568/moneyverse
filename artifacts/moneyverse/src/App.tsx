import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Thesis from "@/pages/Thesis";
import Curriculum from "@/pages/Curriculum";
import Research from "@/pages/Research";
import Masterclass from "@/pages/Masterclass";
import Tools from "@/pages/Tools";
import GlossaryTerm from "@/pages/GlossaryTerm";
import Guide from "@/pages/Guide";
import Compare from "@/pages/Compare";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/thesis" component={Thesis} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/research" component={Research} />
      <Route path="/masterclass" component={Masterclass} />
      <Route path="/tools" component={Tools} />
      <Route path="/learn/:term" component={GlossaryTerm} />
      <Route path="/guides/:slug" component={Guide} />
      <Route path="/compare/:slug" component={Compare} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
