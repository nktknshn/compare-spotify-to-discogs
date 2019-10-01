import { pipe } from "fp-ts/lib/pipeable";
import { union, sort } from "fp-ts/lib/Array";
import { eqString } from "fp-ts/lib/Eq";
import { ordString } from "fp-ts/lib/Ord";

export const uniq = (arr1: string[], arr2: string[]) =>
  pipe(
    union(eqString)(arr1, arr2),
  );