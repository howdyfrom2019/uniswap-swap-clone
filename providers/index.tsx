import { HeroUIProvider } from "@heroui/react";
import { Provider } from "jotai";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <HeroUIProvider>{children}</HeroUIProvider>
    </Provider>
  );
}
