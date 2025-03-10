"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const goLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button onClick={goLoginPage}>登录</Button>
    </div>
  );
}
