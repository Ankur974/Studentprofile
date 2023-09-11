import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
import { trackEvent } from "@/utils/helpers";
import { useEffect } from "react";
import Listing from "../components/saloonListing";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    // trackEvent("home-loads");
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Listing />
      </main>
    </>
  );
}
