import { Suspense } from "react";
import PaymentWrapper from "./components/Payment";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentWrapper />
    </Suspense>
  );
}
