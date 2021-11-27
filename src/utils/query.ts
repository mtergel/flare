export const queryParamToString = (
  input: string | string[] | undefined,
  defaultValue: string
) => {
  if (typeof input === "string") {
    return input;
  } else return defaultValue;
};

export const queryParamToNumber = (
  input: string | string[] | undefined,
  defaultValue: number
) => {
  if (typeof input === "string") {
    const _num = parseInt(input);
    return isNaN(_num) ? defaultValue : _num;
  } else return defaultValue;
};
