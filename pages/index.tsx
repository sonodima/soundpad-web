import Head from "next/head";

import Category from "../models/Category";
import Sound from "../models/Sound";

import CategoryViewer from "../components/CategoryViewer";

const sounds: Sound[] = [
  {
    title: "Sample Sound",
    duration: "0:01",
    id: 1,
  },
  {
    title: "Fart",
    duration: "0:02",
    id: 2,
  },
  {
    title: "Burp",
    duration: "0:02",
    id: 3,
  },
];

const categories: Category[] = [
  {
    name: "First",
    sounds: sounds,
  },
  {
    name: "Second",
    sounds: sounds,
  },
  {
    name: "Third",
    sounds: sounds,
  },
];

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-black">
      <Head>
        <title>Soundpad</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col min-h-screen">
        <h1 className="text-3xl font-bold p-5 text-black dark:text-white">
          Soundpad
        </h1>

        <CategoryViewer
          categories={categories}
          onSoundPressed={(sound) => console.log(sound)}
        />
      </main>
    </div>
  );
}
