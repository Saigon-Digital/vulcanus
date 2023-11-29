import Image from "next/image";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  return (
    <main className="container">
      <div className="bg-primary-blue-main">Front-page</div>
    </main>
  );
}
