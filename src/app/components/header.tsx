"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); 

  const switchLanguage = (locale: string) => {
    // Redirect to the same page with the new locale
    router.push(`/${locale}${pathname === "/" ? "" : pathname}`);
  };

  return (
    <header className="flex items-center gap-5 justify-between p-4">
      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded-md transition"
      >
        {" "}
        <Image src="/CaretLeft.png" alt="" width={32} height={32} />
      </button>
      <div className="flex ">
        <Image src="/mercado_basket.png" alt="" width={59} height={50} />
      </div>

      <button
        onClick={() => switchLanguage("es")}
        className="px-4 py-2 text-black rounded-md transition"
      >
        {" "}
       ES/EN
      </button>
    </header>
  );
}
