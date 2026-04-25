import MiniPlayer from "@/components/MiniPlayer";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Moon, Radio, Sun, Tv2 } from "lucide-react";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { to: "/", label: "Channels", icon: Tv2, ocid: "nav.channels_link" },
  {
    to: "/favorites",
    label: "Favorites",
    icon: Heart,
    ocid: "nav.favorites_link",
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      data-ocid="theme_toggle"
      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { state } = usePlayer();
  const hasPlayer = state.currentTrack !== null;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-md">
        <div className="flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.logo_link"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full gradient-tropical animate-pulse-glow opacity-80" />
              <Radio className="relative z-10 size-8 p-1.5 text-card" />
            </div>
            <span className="font-display text-xl font-bold text-primary tracking-wide">
              Beach Waves FM
            </span>
          </Link>

          {/* Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={ocid}
                  className={[
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  ].join(" ")}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: hasPlayer ? "6rem" : "0" }}
      >
        {children}
      </main>

      {/* Mobile nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border flex justify-around py-2"
        style={{ bottom: hasPlayer ? "5rem" : "0" }}
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              data-ocid={`mobile.${ocid}`}
              className={[
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs transition-smooth",
                active ? "text-primary" : "text-muted-foreground",
              ].join(" ")}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Mini Player */}
      {hasPlayer && <MiniPlayer />}

      {/* Caffeine attribution footer */}
      <footer className="hidden md:flex items-center justify-center py-2 bg-muted/40 border-t border-border text-xs text-muted-foreground">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 hover:text-foreground transition-colors duration-200"
        >
          Built with love using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
