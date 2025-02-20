import { HeroUIProvider } from "@heroui/react";

export default function Provider({ children }: { children: React.ReactNode }) {
  <HeroUIProvider>{children}</HeroUIProvider>;
}
