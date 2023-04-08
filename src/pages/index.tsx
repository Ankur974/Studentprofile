import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { trackEvent } from '@/utils/helpers'
import { useEffect } from 'react'
import PrimaryButton from '@/components/ui/common/button'
import Calendar from '@/components/ui/common/Calendar'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    trackEvent("home-loads");
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        {/* <PrimaryButton size="sm" textColor="white" bgColor="accent-800" onClick={() => { }}>Proceed</PrimaryButton> */}
        <Calendar value={new Date()} onChange={function (date: Date | null): void {
          throw new Error('Function not implemented.')
        }} />
      </main>
    </>
  )
}
