import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import { LanguageProvider } from "./context/LanguageContext";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Forms from "./pages/Forms";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Schemes from "./pages/Schemes";
import Services from "./pages/Services";

const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <Layout>
        <Outlet />
      </Layout>
      <Toaster position="top-right" richColors />
    </LanguageProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const formsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forms",
  component: Forms,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const schemesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/schemes",
  component: Schemes,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  formsRoute,
  servicesRoute,
  schemesRoute,
  blogRoute,
  galleryRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
