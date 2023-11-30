import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} container`}>
      <nav className={styles.nav}>
        <Link href="/">
          <span className={styles.logo}>Products.com</span>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
