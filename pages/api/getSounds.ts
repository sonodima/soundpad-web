import type { NextApiRequest, NextApiResponse } from "next";
import soundpad from "../../lib/Soundpad";

import Category from "../../models/Category";
import Sound from "../../models/Sound";

type Data = {
  error?: string;
  categories?: Category[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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

  if (!soundpad.connected) {
    console.log("Attempting connection to Soundpad pipe");
    const result = await soundpad.connect();
    console.log(`Connection result: ${result}`);

    if (!result) {
      return res.status(501).json({ error: "Could not connnect to Soundpad" });
    }
  }

  soundpad.getSounds();

  res.status(200).json({ categories });
}
