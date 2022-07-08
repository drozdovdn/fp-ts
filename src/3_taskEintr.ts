import * as T from 'fp-ts/lib/Task';
import * as E from 'fp-ts/lib/Either';

import axios from 'axios';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

/**********************************************/
import { absurd, constVoid, unsafeCoerce } from 'fp-ts/lib/function';

const result = pipe(
  TE.tryCatch(
    () => axios.get('https://httpstat.us/200'),
    () => constVoid() as never
  ),
  TE.map((resp) => unsafeCoerce<unknown, Resp>(resp.data)),
  TE.fold(absurd, T.of)
);
// Not executing the promise

// Result is of type:
// T.Task<Resp>
console.log({ result });
/**********************************************/
(async () => {
  const ok = await pipe(
    TE.tryCatch(
      () => axios.get('https://httpstat.us/200'),
      (reason) => new Error(`${reason}`)
    ),
    TE.map((resp) => resp.data)
  )();

  console.log(ok);
  // { _tag: 'Right', right: { code: 200, description: 'OK' } }
})();
/************************************/
type Resp = { code: number; description: string };
(async () => {
  const result = await pipe(
    TE.tryCatch(
      () => axios.get('https://httpstat.us/500'),
      (reason) => new Error(`${reason}`)
    ),
    TE.map((resp) => resp.data)
  )();

  console.log(result);
})();

/************************************/

const foo = 888;
const bar = T.of(foo);
console.log(bar.toString());
const out: T.Task<number> = () => Promise.resolve(foo);

// async function someTask(id: string) {
//   if (id.length > 36) {
//     throw new Error('id > 36');
//   }
//   console.log({ id });
// }
//
// const id = 'abc';
//
// const task: T.Task<void> = () => someTask(id);
