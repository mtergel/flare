import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.status(204);
};

export default handler;
