import { getDictionary } from "@/app/dictionaries";
import { Button } from "@heroui/react";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <div>
      hell
      <Button color={"secondary"} className={"text-primary"}>
        {dict.header.nav.connect}
      </Button>
    </div>
  );
}
