export function randomNumberRange(query: number, range: number) {
  return getRandomInt(query - range / 2, query + range / 2);
}

export function hasDuplicates(array: any[]) {
  return new Set(array).size !== array.length;
}

function getRandomInt(min: number, max: number) {
  // min and max are inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateQuestion(digits: number) {
  const sign = operators[Math.floor(Math.random() * operators.length)];
  const max = Number("1" + Array(digits).fill(0).join(''));
  const first = Math.floor(Math.random() * max);
  const second = Math.floor(Math.random() * max);
  const question = `${first} ${sign} ${second}`;
  // eslint-disable-next-line
  const finalAnswer = eval(question);
  return {question, finalAnswer}
}

export function shuffle(a: any[]) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const operators = ["+", "-", "*", "/"];


