export class Utils {
    public static isNumber = (value: string) => RegExp(/[0-9]/g).test(value);
    public static isDecimal = (value: string) => value === ".";
    public static isMathOperator = (value: string) =>
      ["+", "-", "/", "*"].includes(value);
    public static isEqualOperator = (value: string) => value === "=";
    public static isCancel = (value: string) => value === "AC";
  }