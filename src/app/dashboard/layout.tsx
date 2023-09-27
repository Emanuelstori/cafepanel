import Image from "next/image";
import Header from "../components/Header/Header";
import ThemeSwitcher from "../components/ThemeSwitcher";
import "../globals.css";
import Providers from "../providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <Header />
          <nav className="group fixed left-0 right-0 h-screen w-16 bg-[#0d0d28] flex flex-col items-center shadow-md shadow-[rgba(0,0,0.25)] transition-all hover:transition-all hover:w-72">
            <div className="flex w-full h-16 px-6 items-center justify-start text-center group-hover:w-full group-hover:justify-start group-hover:items-center gap-8">
              <div className="w-16 h-24 relative">
                <Image
                  src={"/images/logo-icon.png"}
                  alt={"logo icon"}
                  fill
                  objectFit="contain"
                />
              </div>
              <p className="hidden group-hover:flex text-transparent bg-clip-text bg-gradient-to-tl from-amber-600 to-amber-300 brightness-125">
                Café Dourado
              </p>
            </div>
          </nav>
          <main className="w-full flex flex-col items-center">{children}</main>
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}
