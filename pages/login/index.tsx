import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useAuthStore } from "@/stores/authStore";
import supabaseClientSide from "@/utils/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state: any) => state.login);
  const setAdmin = useAuthStore((state: any) => state.setAdmin);
  const setNonAdmin = useAuthStore((state: any) => state.setNonAdmin);

  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      console.log(res);
      setCookie("token", res.data.token);
      if (res.data.user.status == 2) {
        setAdmin();
      } else {
        setNonAdmin();
      }
      login();
      router.push("/admin/announcements");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-black">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h1 className="mb-4 text-2xl">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
