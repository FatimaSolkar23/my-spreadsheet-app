import Head from 'next/head';
import Spreadsheet from '../components/Spreadsheet';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Spreadsheet App</title>
        <meta name="description" content="A simple spreadsheet application built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl font-bold mb-4"><strong>Spreadsheet Application</strong></h1>
      <Spreadsheet />
    </div>
  );
}
