import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { CircularProgress } from "@mui/material";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const [cookies] = useCookies(["token"]);
  const sessionData = useSession();
  const supabaseC = useSupabaseClient();
  const [loadingPage, setLoadingPage] = useState(false);
  const token = cookies.token;

  useEffect(() => {
    console.log(sessionData, "session");
    if (!sessionData) {
      supabaseC.auth.refreshSession(token);
    }
  }, [sessionData, cookies]);

  useEffect(() => {
    setLoadingPage(true);

    if (
      !isAuthenticated &&
      router.pathname !== "/login" &&
      router.pathname !== "/signup" &&
      router.pathname !== "/signout" &&
      !token
    ) {
      setLoadingPage(false);
      router.push("/login");
    }
    setLoadingPage(false);
  }, [isAuthenticated, router, cookies, sessionData]);

  if (loadingPage) {
    return <CircularProgress />;
  }

  return <>{children}</>;
};

export default AuthGuard;
