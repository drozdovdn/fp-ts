import * as T from 'fp-ts/lib/Task';
import * as E from 'fp-ts/lib/Either';

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

type Either<E, A> = Left<E> | Right<A>;

export interface Left<E> {
  readonly _tag: 'Left';
  readonly left: E;
}

export interface Right<A> {
  readonly _tag: 'Right';
  readonly right: A;
}
//////////////////////////////////////

export class MinLengthValidationError extends Error {
  public _tag: 'PasswordMinLengthValidationError';

  public minLength: number;

  private constructor(minLength: number) {
    super(`password fails to meet min length requirement: ${minLength}`);
    this._tag = 'PasswordMinLengthValidationError';
    this.minLength = minLength;
  }

  public static of(minLength: number): MinLengthValidationError {
    return new MinLengthValidationError(minLength);
  }
}

export class CapitalLetterMissingValidationError extends Error {
  public _tag: 'PasswordCapitalLetterMissingValidationError';

  private constructor() {
    super(`password is missing a capital letter`);
    this._tag = 'PasswordCapitalLetterMissingValidationError';
  }

  public static of(): CapitalLetterMissingValidationError {
    return new CapitalLetterMissingValidationError();
  }
}

export type PasswordValidationError = MinLengthValidationError | CapitalLetterMissingValidationError;

export interface Password {
  _tag: 'Password';
  value: string;
  isHashed: boolean;
}

export function of(value: string): Password {
  return { _tag: 'Password', value, isHashed: false };
}

export function formHashed(value: string): Password {
  return { _tag: 'Password', value, isHashed: true };
}

export type PasswordSpecification = {
  minLength?: number;
  capitalLetterRequired?: boolean;
};

export function validate({ minLength = 0, capitalLetterRequired = false }: PasswordSpecification = {}) {
  return (password: Password): E.Either<PasswordValidationError, Password> => {
    if (password.value.length < minLength) {
      return E.left(MinLengthValidationError.of(minLength));
    }

    if (capitalLetterRequired && !/[A-Z]/.test(password.value)) {
      return E.left(CapitalLetterMissingValidationError.of());
    }

    return E.right({ ...password, isValidated: true });
  };
}
