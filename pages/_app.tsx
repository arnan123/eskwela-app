import { AppProps } from "next/app";
import "../styles/globals.css";
import NavBar from "@/components/Buttons/SignoutButton";
import AuthGuard from "@/components/Layout/Authguard";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabaseClientSide, {
  supabaseClientSideTest,
} from "@/utils/supabase/client";
import LayoutPage from "@/components/Layout/LayoutPage";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider
        initialSession={pageProps.initialSession}
        supabaseClient={supabaseClientSide}
      >
        <AuthGuard>
          <LayoutPage>
            <Component {...pageProps} />
          </LayoutPage>
        </AuthGuard>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
