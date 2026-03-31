import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="nav">
        <div className="logo">
          <Link href="/">
            Xaitsnoo Community Dictionary Project
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <div>
            <Link href="/browse">Browse</Link>
          </div>
          <div>
            <Link href="/how-to-use">How to Use</Link>
          </div>
          <div>
            <Link href="/xaitsnoo">About Xaitsnoo</Link>
          </div>
          <div>
            <Link href="/speakers">Speakers</Link>
          </div>
          <div>
            <Link href="/about">About the Dictionary</Link>
          </div>
        </div>
      </div>

      <main>
        <Component {...pageProps} />
      </main>

      <div className="footer">
        <p>
          This work is possible because of dozens of Xaitsnoo language speakers
          whose voices have been held in various archives. Read more about these
          speakers <Link href="/speakers">here</Link>. This website, its contents, and
          the Xaitsnoo language belong to the Xaitsnoo-speaking Pomo communities
          (Elem, Koi, and Kamdot). By using any part of this website, you agree
          to respect the communities’ language sovereignty and to not use any
          part of this dictionary or website for commercial purposes.
          <br />
          <br />
          <Link href="https://github.com/Xaitsnue-Community-Dictionary-Project/xaitsnue">Open source</Link>, a project housed in the{" "} <Link href="https://lx.berkeley.edu/"> UC Berkeley Department of Linguistics</Link>.
        </p>
      </div>
    </>
  );
}
