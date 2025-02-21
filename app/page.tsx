import { getDictionary } from "@/app/dictionaries";
import SwapForm from "@/features/swap/swap-form";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <div>
      <SwapForm />
    </div>
  );
}
