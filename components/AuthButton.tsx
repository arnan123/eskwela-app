import Link from "next/link";
import { redirect } from "next/navigation";
import supabaseClientSide from "../utils/supabase/client";

export default function AuthButton() {
  const signOut = async () => {
    await supabaseClientSide.auth.signOut();
    return redirect("/login");
  };

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
