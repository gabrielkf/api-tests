import { expect, test } from 'vitest';
import { getFutureDate } from './get-future-date';

test('increase date in one year', () => {
  const year = new Date().getFullYear();
  expect(getFutureDate(`${year}-09-22`).getFullYear()).toEqual(
    year + 1
  );
});
