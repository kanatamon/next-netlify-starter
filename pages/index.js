import { useState } from 'react'
import Head from 'next/head'
import Footer from '@components/Footer'
import Input from '@components/Input'

export default function Home() {
  const [value, setValue] = useState(0);
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Input
          placeholder={'0.'.padEnd(decimal + 2, '0')}
          decimal={2}
          maxRange={99999999.99}
          onChange={(value) => setValue(value)}
          value={value}
        />
      </main>
      <Footer />
    </div>
  )
}
