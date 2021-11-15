import { customAlphabet } from "nanoid";
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const postid = customAlphabet(alphabet, 10);

export default postid;