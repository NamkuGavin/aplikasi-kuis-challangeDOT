import { LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function BuildHeader() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-[#262A35]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex gap-1">
            <p className="text-[#FF7200] font-bold">Open</p>
            <p className="text-white font-bold">Trivia</p>
          </div>

          <Button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
          >
            <LogOut data-icon="inline-start" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default BuildHeader;
