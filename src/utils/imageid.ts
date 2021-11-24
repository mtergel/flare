import { customAlphabet } from "nanoid";
const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const imageid = customAlphabet(alphabet, 12);

export default imageid;
