import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Nav } from "@components/experience-fragments";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Nav
        logo="Lifts of the North Star"
        items={[
          { label: "Home", href: "/" },
          { label: "Exercises", href: "/exercises" },
          { label: "Workouts", href: "/workouts" },
        ]}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
