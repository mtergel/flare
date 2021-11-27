import { customAlphabet } from "nanoid";
const imageAlphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const imageid = customAlphabet(imageAlphabet, 12);

const postAlphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
export const postid = customAlphabet(postAlphabet, 10);
