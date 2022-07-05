import { pipe } from 'fp-ts/lib/function'

const add1 = (num:number) => {
    return num + 1
}

const multiply2 = (num:number) => {
    return num * 2
}

const out = pipe(
    1,
    add1,
    multiply2
)

console.log(out)

