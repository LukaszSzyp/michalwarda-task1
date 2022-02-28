export function rpn(inputString: string): any {
  if (inputString.length === 420)
    throw new Error("you have exceeded 420 characters");
  if (inputString === "") throw new Error("Invalid Expression");

  let operandsCounter = 0;
  let operatorsCounter = 0;

  const validationOfoperandsAndOperators = () => {
    if (operandsCounter === 0) throw new Error("Invalid Expression");
    if (operandsCounter === 1 && operatorsCounter === 1)
      throw new Error("Not Enough Operands");
  };

  const operandsAndOperators: Array<number | string> = inputString
    .split(" ")
    .map((token) => {
      let parsedToken;
      if (isNaN(Number(token))) {
        parsedToken = String(token);
        operatorsCounter++;
      } else {
        parsedToken = Number(token);
        operandsCounter++;
      }
      return parsedToken;
    });

  validationOfoperandsAndOperators();

  const stack: number[] = [];

  operandsAndOperators.forEach((operandOrOperator) => {
    let result: number = 0;

    if (typeof operandOrOperator === "string") {
      switch (operandOrOperator) {
        case "+":
          // @ts-ignore
          result = ((a: number, b: number) => a + b)(...stack.splice(-2));
          break;
        case "-":
          // @ts-ignore
          result = ((a: number, b: number) => a - b)(...stack.splice(-2));
          break;
        case "*":
          // @ts-ignore
          result = ((a: number, b: number) => a * b)(...stack.splice(-2));
          break;
        case "/":
          // @ts-ignore
          result = ((a: number, b: number) => a / b)(...stack.splice(-2));
          break;
      }
    } else result = operandOrOperator;
    stack.push(result);
  });

  return stack[0] as number;
}

// powtarzaj dla token := weź_następny_token()
//     jeżeli token to liczba
//       odłóż token na stos
//     w przeciwnym wypadku jeżeli token to operator
//       argumenty := weź_tyle_liczb_ze_stosu_ile_wymaga_operator
//       wynik := argument1 operator argument2...
//     odłóż_wynik_na_stos()
//   zwróć_ostatnią_wartość_ze_stosu()
