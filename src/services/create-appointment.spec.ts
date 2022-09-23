import { describe, expect, it } from 'vitest';
import { Appointment } from '../entities/appointment';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository';
import { getFutureDate } from '../tests/utils/get-future-date';
import { CreateAppointment } from './create-appointment';

const TEST_CUSTOMER_NAME = 'John Doe';

describe('Create appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointment = new CreateAppointment(
      new InMemoryAppointmentRepository()
    );

    const startDate = getFutureDate('2022-09-23');
    const endDate = getFutureDate('2022-09-24');

    expect(
      createAppointment.execute({
        customer: TEST_CUSTOMER_NAME,
        startsAt: startDate,
        endsAt: endDate,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it('should not be able to create an appointment which overlaps another', async () => {
    const createAppointment = new CreateAppointment(
      new InMemoryAppointmentRepository()
    );

    await createAppointment.execute({
      customer: TEST_CUSTOMER_NAME,
      startsAt: getFutureDate('2022-09-20'),
      endsAt: getFutureDate('2022-09-24'),
    });

    expect(
      createAppointment.execute({
        customer: TEST_CUSTOMER_NAME,
        startsAt: getFutureDate('2022-09-19'),
        endsAt: getFutureDate('2022-09-21'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: TEST_CUSTOMER_NAME,
        startsAt: getFutureDate('2022-09-19'),
        endsAt: getFutureDate('2022-09-25'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: TEST_CUSTOMER_NAME,
        startsAt: getFutureDate('2022-09-21'),
        endsAt: getFutureDate('2022-09-22'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: TEST_CUSTOMER_NAME,
        startsAt: getFutureDate('2022-09-21'),
        endsAt: getFutureDate('2022-09-25'),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
