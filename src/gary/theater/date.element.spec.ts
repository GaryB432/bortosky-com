import { formatDate } from './date.element';

const testFormat = 'mmmm yyyy';

test('formatDate', () => {
  expect(formatDate('asdf', testFormat).toString()).toEqual('invalid date');
  expect(formatDate('1959-05', 'nope').toString()).toEqual(
    'invalid format "nope"'
  );
  expect(formatDate('1959-05', testFormat).toString()).toEqual('May 1959');
});
