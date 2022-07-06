import { pipe, flow } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

interface Foo {
  bar: string;
}

const foo = {
  bar: 'hello',
} as Foo | undefined;

const out = pipe(
  foo,
  O.fromNullable,
  O.map(({ bar }) => bar)
);

console.log(out);

interface Fizz {
  buzz: string;
}

interface Foo2 {
  bar?: Fizz;
}

const foo2 = {
  bar: undefined,
} as Foo2 | undefined;

// pipe(foo2, (f) => f?.bar?.buzz);
// pipe(
//   foo2,
//   O.fromNullable,
//   O.map(({ bar: { buzz } }) => buzz)
// );

const out2 = pipe(
  foo2,
  O.fromNullable,
  O.map(({ bar }) =>
    pipe(
      bar,
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  ),
  O.flatten
);

console.log(out2);

const out3 = pipe(
  foo2,
  O.fromNullable,
  O.map(({ bar }) => bar),
  O.chain(
    flow(
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  )
);

console.log(out3);
