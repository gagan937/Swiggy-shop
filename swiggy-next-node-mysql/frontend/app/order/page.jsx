import { Suspense } from "react";
import OrderClient from "./OrderClient";

export default function OrderPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading order page...</div>}>
      <OrderClient />
    </Suspense>
  );
}
