"use client";


import { Suspense } from "react";
import Success from "./component/Success";
import ButtonLoder from "@/components/ui/ButtonLoder";

export default function SuccessPage() {


  return (
   <Suspense fallback={<div className="w-screen min-h-screen flex items-center justify-center"><ButtonLoder/></div>}>
    <Success/>
   </Suspense>
  );
}
