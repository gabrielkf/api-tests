import { describe, expect, it } from 'vitest';
import { Appointment } from '../entities/appointment';
import { CreateAppointment } from './create-appointment';

const NAME = 'John Doe';

describe('Create appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointment = new CreateAppointment();

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: NAME,
        startsAt: startDate,
        endsAt: endDate,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
