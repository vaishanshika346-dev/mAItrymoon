import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* pt-24/28 clears the fixed floating pill navbar (see Header.tsx) */}
      <main className="flex-1 pt-24 sm:pt-28">{children}</main>
      <Footer />
    </div>
  );
}
