import { pipe, flow } from 'fp-ts/lib/function'

const init = (num: number): number => {
    return num
}
const add1 = (num:number):number => {
    return num + 1
}

const multiply2 = (num:number):number => {
    return num * 2
}
const toString = (num: number):string => {
    return `${num}`
}
const out = pipe(
    init(1),
    flow(
        add1,
        multiply2,
        toString
    )
)

// console.log(out)
// console.log(typeof out)


function concat(a: number, transformer: (a: number) => string): [number, string] {
  return [a, transformer(a)]
}

const out1 = concat(1, (n)=> pipe(n, add1, multiply2, toString)) //Плохо
const out2 = concat(1, flow(add1, multiply2, toString)) //Хорошо

console.log({out1})
console.log({out2})
