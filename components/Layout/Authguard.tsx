import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;

    if (
      !isAuthenticated &&
      router.pathname !== "/login" &&
      router.pathname !== "/signup" &&
      router.pathname !== "/signout" &&
      !token
    ) {
      router.push("/login");
    }
  }, [isAuthenticated, router, cookies]);

  return <>{children}</>;
};

export default AuthGuard;
