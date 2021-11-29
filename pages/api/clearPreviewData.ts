import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.status(204).json({ message: "Cleared" });
};

export default handler;
