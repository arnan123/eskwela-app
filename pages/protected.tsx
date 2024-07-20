import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Protected = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!session) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Protected Page</h1>
      <p>Welcome, {session.user?.email}!</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Protected;
