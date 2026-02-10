import { Suspense } from "react";
import PaymentWrapper from "./components/Payment";
import ButtonLoder from "@/components/ui/ButtonLoder";

export default function Page() {
  
  return (
    <Suspense fallback={<div className="w-screen min-h-screen flex items-center justify-center"><ButtonLoder/></div>}>
      <PaymentWrapper />
    </Suspense>
  );
}
