import Header from "@/components/header";
import { getDictionary } from "@/app/dictionaries";

export default async function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary();
  return (
    <>
      <Header initialDict={dict} />
      {children}
    </>
  );
}
