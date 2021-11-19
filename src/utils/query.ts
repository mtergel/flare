export const queryParamToString = (input: string | string[] | undefined) => {
  if (typeof input === "string") {
    return input;
  } else return "";
};
