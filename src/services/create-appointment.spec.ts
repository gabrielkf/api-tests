import { describe, expect, it } from 'vitest';
import { Appointment } from '../entities/appointment';
import { getFutureDate } from '../tests/utils/get-future-date';
import { CreateAppointment } from './create-appointment';

const NAME = 'John Doe';

describe('Create appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointment = new CreateAppointment();

    const startDate = getFutureDate('2022-09-23');
    const endDate = getFutureDate('2022-09-24');

    expect(
      createAppointment.execute({
        customer: NAME,
        startsAt: startDate,
        endsAt: endDate,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
