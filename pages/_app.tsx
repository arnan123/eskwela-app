import { AppProps } from "next/app";
import "../styles/globals.css";
import NavBar from "@/components/Buttons/SignoutButton";
import AuthGuard from "@/components/Layout/Authguard";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabaseClientSide, {
  supabaseClientSideTest,
} from "@/utils/supabase/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider
        initialSession={pageProps.initialSession}
        supabaseClient={supabaseClientSideTest}
      >
        <AuthGuard>
          <NavBar />
          <Component {...pageProps} />
        </AuthGuard>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
