import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center flex-wrap gap-4">
      <div className="tracking-wider uppercase font-medium">
        The Page You Were Looking For Doesn't Exist.
      </div>
      <Button variant={"default"} onClick={() => router.push("/")}>
        Return Home Page
      </Button>
    </div>
  );
}
