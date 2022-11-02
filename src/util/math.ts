export function randomNumberBelow(query: number) {
  return Math.floor(Math.random() * query);
}

export function randomNumberAbove(query: number, maxRange: number) {
  return Math.floor(Math.random() * maxRange) + query;
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