import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";

const NavBar = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link href="/login">Login </Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/signout">Sign Out</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
