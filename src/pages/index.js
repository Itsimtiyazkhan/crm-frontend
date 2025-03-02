import { useState } from "react";
import { useRouter } from "next/router";
import LoginDashboard from "./superadmin/index";

export default function Home() {
  return <LoginDashboard />;
}
