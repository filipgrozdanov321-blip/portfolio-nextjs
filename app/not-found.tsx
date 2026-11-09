import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/partials/header";
import Footer from "@/components/partials/footer";
import "../styles/pages/NotFound.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// Shown for any URL that doesn't exist. It sits outside the (portfolio)
// layout, so it adds the header and footer itself.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found">
        <p className="not-found-code">404</p>
        <h1>This page doesn&apos;t exist</h1>
        <p className="not-found-text">
          The link may be old, or the address may have a typo. Here are a few
          places to go instead:
        </p>
        <div className="not-found-links">
          <Link href="/" className="not-found-primary">
            Back to home
          </Link>
          <Link href="/projects" className="not-found-secondary">
            See projects
          </Link>
          <Link href="/contact" className="not-found-secondary">
            Contact me
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
