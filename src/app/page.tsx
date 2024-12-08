import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const metadata = {
  title: "Home",
  description: "Landing page",
};

export default function Home() {
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <script src="//code.tidio.co/7ghvmky1mcgimuuzffr8cktvubmxwkbp.js" async></script>
      <div className=" space-y-6 text-center ">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-lg text-white">A Simple Authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
