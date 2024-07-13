import AuthButton from "../../AuthButton";
import DeployButton from "../../DeployButton";
import NextLogo from "../../NextLogo";
import SupabaseLogo from "../../SupabaseLogo";

export default function Header() {
  return (
    <div className="w-full">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          <AuthButton />
        </div>
      </nav>
    </div>
  );
}
