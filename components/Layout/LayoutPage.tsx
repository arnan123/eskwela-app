// pages/dashboard.tsx
"use client";
import { usePathname } from "next/navigation";
import Header from "./LayoutComponents/Header";
import AdminLayout from "./LayoutComponents/AdminLayout";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <div className="bg-slate-300 h-[100%] min-h-[100vh]">
      <AdminLayout>{children}</AdminLayout>

      {/* <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer> */}
    </div>
  );
};

export default LayoutPage;
