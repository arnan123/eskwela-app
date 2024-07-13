import { AppProps } from "next/app";
import "../styles/globals.css";
import NavBar from "@/components/Buttons/SignoutButton";
import AuthGuard from "@/components/Layout/Authguard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthGuard>
        <NavBar />
        <Component {...pageProps} />
      </AuthGuard>
    </>
  );
}

export default MyApp;
