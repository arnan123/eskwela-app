// pages/dashboard.tsx
"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./LayoutComponents/AdminSidebar";
import Header from "./LayoutComponents/Header";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <div className=" w-full h-full">
      <div>
        <Header />
      </div>
      <div className="flex">
        <Sidebar />
        <div className="p-[5rem]">{children}</div>
      </div>

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
