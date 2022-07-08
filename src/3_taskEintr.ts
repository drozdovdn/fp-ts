import * as T from 'fp-ts/lib/Task';
import * as E from 'fp-ts/lib/Either';

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
