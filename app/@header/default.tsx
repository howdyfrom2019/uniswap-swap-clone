import { getDictionary } from "@/app/dictionaries";
import Header from "@/components/header";

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
