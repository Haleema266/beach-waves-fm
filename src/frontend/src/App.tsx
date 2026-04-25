import Layout from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayerProvider } from "@/context/PlayerContext";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";

const ChannelsPage = lazy(() => import("@/pages/ChannelsPage"));
const PlayerPage = lazy(() => import("@/pages/PlayerPage"));
const FavoritesPage = lazy(() => import("@/pages/FavoritesPage"));

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => (
          <Skeleton key={id} className="h-48 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function RootLayout() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const channelsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ChannelsPage,
});
const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/player",
  component: PlayerPage,
});
const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/favorites",
  component: FavoritesPage,
});

const routeTree = rootRoute.addChildren([
  channelsRoute,
  playerRoute,
  favoritesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <PlayerProvider>
        <RouterProvider router={router} />
      </PlayerProvider>
    </ThemeProvider>
  );
}
