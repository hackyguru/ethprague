import "@/styles/globals.css";
import { Web3Modal } from "@/context";

export const metadata = {
  title: 'Web3Modal',
  description: 'Web3Modal Example'
}

export default function App({ Component, pageProps }) {
  return (
    <Web3Modal>
  <Component {...pageProps} />
  </Web3Modal>
  );
}
