import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KeranjangProvider } from "@/components/KeranjangProvider";
import { FavoritProvider } from "@/components/FavoritProvider";
import { toko } from "@/lib/toko";

export const metadata = {
  title: toko.nama,
  description: toko.tagline,
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('moya-batik-tema');
                if (t === 'gelap' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased transition-colors">
        <FavoritProvider>
          <KeranjangProvider>
            <Header />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
            <Footer />
          </KeranjangProvider>
        </FavoritProvider>
      </body>
    </html>
  );
}
