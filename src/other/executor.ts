/**
 * Определённый пункт конфига
 */

type Item<A> = {
  // массив чисел, который будет проверяться на "хоть один находится в"
  contains: number[];
  // если хоть один находится, то добавить в аккумулятор это значение
  value: A;
};

type MenuItem = {
  id: number;
  name: string;
  target: string;
  icon: string;
};

const executor = <A extends { id: number }>(p: {
  // стартовое значение аккумулятора
  start: Record<number, A>;
  // список из пунктов конфига
  config: Item<A>[];
  // общий массив чисел по которому ты матчишься
  ids: number[];
}): Record<number, A> => {
  const idsSet = new Set(p.ids);

  return p.config.reduce((acc, item) => {
    for (const key of item.contains) {
      if (acc[item.value.id]) break;
      if (idsSet.has(key)) {
        return { ...acc, [item.value.id]: item.value };
      }
    }
    return acc;
  }, p.start);
};

const config: Item<MenuItem>[] = [
  {
    contains: [2, 3],
    value: {
      id: 1,
      name: 'Группы контроля',
      target: '',
      icon: 'icon',
    },
  },
  {
    contains: [4, 5, 6],
    value: {
      id: 2,
      name: 'Счетсчики посетителей',
      target: '',
      icon: 'icon',
    },
  },
  {
    contains: [7],
    value: {
      id: 3,
      name: 'Счетсчики посетителей',
      target: '',
      icon: 'icon',
    },
  },
];

const initStart: Record<number, MenuItem> = {
  0: {
    id: 0,
    target: '',
    name: 'name',
    icon: '',
  },
};

// финальный результат
const data = executor({
  start: initStart,
  config,
  ids: [1, 2, 3, 7],
});

console.log({ data });
