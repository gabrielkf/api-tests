import { expect, test } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';

const TEST_CUSTOMER_NAME = 'John Doe';

test('create an appointment', () => {
  const appointment = new Appointment({
    customer: TEST_CUSTOMER_NAME,
    startsAt: getFutureDate('2022-09-23'),
    endsAt: getFutureDate('2022-09-24'),
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual(TEST_CUSTOMER_NAME);
});

test('cannot create appointment with end date earlier than start date', () => {
  expect(() => {
    return new Appointment({
      customer: TEST_CUSTOMER_NAME,
      startsAt: getFutureDate('2022-09-23'),
      endsAt: getFutureDate('2022-09-22'),
    });
  }).toThrow();
});

test('cannot create appointment with start date up to current time', () => {
  expect(() => {
    return new Appointment({
      customer: TEST_CUSTOMER_NAME,
      startsAt: new Date(),
      endsAt: getFutureDate('2022-09-22'),
    });
  }).toThrow();
});
