import { getDictionary } from "@/app/dictionaries";
import { Button } from "@heroui/react";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lng: string }>;
}) {
  const lang = (await searchParams).lng as "en-US" | "ko-KR";
  const dict = await getDictionary(lang);
  return (
    <div>
      hell
      <Button color={"secondary"} className={"text-primary"}>
        {dict.header.nav.connect}
      </Button>
    </div>
  );
}
