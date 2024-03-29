import { useState } from 'react'
import Head from 'next/head'
import Footer from '@components/Footer'
import Input from '@components/Input'

export default function Home() {
  const [value, setValue] = useState(0);
  const decimal = 2;
  return (
    <div className="container">
      <iframe src="/dummy.pdf" width="100%" height="500px" />
    </div>
  )
}
