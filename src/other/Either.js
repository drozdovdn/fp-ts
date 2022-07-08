const pipe = (x, ...f) => f.reduce((x, f) => f(x), x);

const left = (error) => ({ tag: 'Left', error });
const right = (value) => ({ tag: 'Right', value });

const map = (f) => (fa) => {
  switch (fa.tag) {
    case 'Left':
      return fa;
    default:
      return right(f(fa.value));
  }
};

const fold = (onLeft, onRight) => (fa) => {
  switch (fa.tag) {
    case 'Left':
      return onLeft(fa.error);
    default:
      return onRight(fa.value);
  }
};

const isRight = (fa) => {
  return fa.tag === 'Right';
};

const res = pipe(
  1,
  (x) => {
    if (x > 0) return right(x);
    else return left(new Error('menshe 0!'));
  },
  map((x) => x * 2)
);

console.log(isRight(res));
