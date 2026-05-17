import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Calculator from "@/pages/Calculator";
import Partner from "@/pages/Partner";
import FAQ from "@/pages/FAQ";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Preview from "@/pages/Preview";
import Success from "@/pages/Success";
import Cancel from "@/pages/Cancel";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import GlossaryTerm from "@/pages/GlossaryTerm";
import Guide from "@/pages/Guide";
import Compare from "@/pages/Compare";
import FreeGuide from "@/pages/FreeGuide";
import AuthCallback from "@/pages/AuthCallback";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/partner" component={Partner} />
      <Route path="/faq" component={FAQ} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/preview/:slug" component={Preview} />
      <Route path="/success" component={Success} />
      <Route path="/cancel" component={Cancel} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/dashboard" component={Dashboard} />

      {/* Legacy redirects */}
      <Route path="/thesis"><Redirect to="/about" /></Route>
      <Route path="/masterclass"><Redirect to="/pricing" /></Route>
      <Route path="/tools"><Redirect to="/calculator" /></Route>
      <Route path="/research"><Redirect to="/blog" /></Route>
      <Route path="/curriculum"><Redirect to="/pricing" /></Route>

      <Route path="/free-guide" component={FreeGuide} />

      {/* SEO pages */}
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
      <AuthProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
