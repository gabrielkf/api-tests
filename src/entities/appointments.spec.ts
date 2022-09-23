import { expect, test } from 'vitest';
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment';

const NAME = 'John Doe';

test('create an appointment', () => {
  const startDate = getFutureDate('2022-09-23');
  const endDate = getFutureDate('2022-09-24');

  const appointment = new Appointment({
    customer: NAME,
    startsAt: startDate,
    endsAt: endDate,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual(NAME);
});

test('cannot create appointment with end date earlier than start date', () => {
  const startDate = getFutureDate('2022-09-23');
  const endDate = getFutureDate('2022-09-22');

  expect(() => {
    return new Appointment({
      customer: NAME,
      startsAt: startDate,
      endsAt: endDate,
    });
  }).toThrow();
});

test('cannot create appointment with start date up to current time', () => {
  const startDate = new Date();
  const endDate = getFutureDate('2022-09-22');

  expect(() => {
    return new Appointment({
      customer: NAME,
      startsAt: startDate,
      endsAt: endDate,
    });
  }).toThrow();
});
