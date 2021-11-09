import * as loglevel from "loglevel";

if (process.env.NODE_ENV !== "production") {
  loglevel.setLevel("debug");
} else {
  loglevel.setLevel("error");
}

export default loglevel;
