import Link from "next/link";
import { redirect } from "next/navigation";
import supabaseClientSide from "../utils/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthButton() {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const router = useRouter();

  const signOut = async () => {
    await supabaseClientSide.auth.signOut();
    return redirect("/login");
  };

  const checkIfLoggedOut = async () => {
    if (!isAuthenticated) {
      await signOut();
    }
  };

  useEffect(() => {
    checkIfLoggedOut().catch((err) => console.error(err));
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center gap-4">
      Hey, User!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  );
}
