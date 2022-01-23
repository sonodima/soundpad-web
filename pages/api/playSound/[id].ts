import type { NextApiRequest, NextApiResponse } from "next";
import soundpad from "../../../lib/Soundpad";

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!soundpad.connected) {
    console.log("Attempting connection to Soundpad pipe");
    const result = await soundpad.connectAsync();
    console.log(`Connection result: ${result}`);

    if (!result) {
      return res.status(501).json({ error: "Could not connnect to Soundpad" });
    }
  }

  const id: number = Number.parseInt(req.query.id.toString());
  soundpad.playSound(id);

  res.status(200).json({});
}
