export function randomNumberRange(query: number, range: number) {
  return getRandomInt(query - range / 2, query + range / 2);
}

export function hasDuplicates(array: any[]) {
  return (new Set(array)).size !== array.length;
}

function getRandomInt(min: number, max: number) { // min and max are inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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