import type { NextApiRequest, NextApiResponse } from "next";
import soundpad from "../../lib/Soundpad";

import Category from "../../models/Category";
import GetSoundsRes from "../../models/GetSoundsRes";
import Sound from "../../models/Sound";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSoundsRes>
) {
  if (!soundpad.connected) {
    console.log("Attempting connection to Soundpad pipe");
    const result = await soundpad.connectAsync();
    console.log(`Connection result: ${result}`);

    if (!result) {
      return res.status(501).json({ error: "Could not connnect to Soundpad" });
    }
  }

  const received = await soundpad.getSoundsAsync();
  if (received == undefined) {
    return res.status(501).json({ error: "No sounds received" });
  }

  let temp = new Map<string, Sound[]>();
  received.forEach((sound) => {
    const blocks = sound.$.url.split("\\");
    if (blocks.length >= 2) {
      const parentDirectory = blocks[blocks.length - 2];
      const name = blocks[blocks.length - 1].replace(/\.[^/.]+$/, "");

      if (!temp.has(parentDirectory)) {
        temp.set(parentDirectory, []);
      }

      temp.get(parentDirectory)?.push({
        title: name,
        duration: sound.$.duration,
        id: sound.$.index,
      });
    }
  });

  let categories: Category[] = [];
  temp.forEach((value, key) => {
    categories.push({ name: key, sounds: value });
  });

  res.status(200).json({ categories });
}
