import { Suspense } from "react";
import CitySpecialsClient from "./CitySpecialsClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>⏳ Loading...</div>}>
      <CitySpecialsClient />
    </Suspense>
  );
}
