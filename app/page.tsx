import LanguageSwitcher from "@/components/language-switcher";
import SwapForm from "@/features/swap/swap-form";

export default async function Home() {
  return (
    <div
      className={
        "flex w-screen min-h-full flex-col items-center relative m-auto"
      }
    >
      <div
        className={"w-full max-w-[480px] pt-[68px] px-2 flex flex-col gap-0.5"}
      >
        <SwapForm />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
