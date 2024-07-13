import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useAuthStore } from "@/stores/authStore";

const Signout = () => {
  const logout = useAuthStore((state: any) => state.logout);
  const router = useRouter();
  const [, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    logout();
    removeCookie("token", { path: "/" });
    router.push("/login");
  }, [logout, removeCookie, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl">Signing out...</p>
    </div>
  );
};

export default Signout;
