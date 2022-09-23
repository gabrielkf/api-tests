import { expect, test } from 'vitest';
import { Appointment } from './appointment';

const NAME = 'John Doe';

test('create an appointment', () => {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  endDate.setDate(endDate.getDate() + 2);

  const appointment = new Appointment({
    customer: NAME,
    startsAt: startDate,
    endsAt: endDate,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual(NAME);
});

test('cannot create appointment with end date earlier than start date', () => {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  endDate.setDate(endDate.getDate());

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
  const endDate = new Date();
  startDate.setDate(startDate.getDate() - 1);

  expect(() => {
    return new Appointment({
      customer: NAME,
      startsAt: startDate,
      endsAt: endDate,
    });
  }).toThrow();
});
