import { Appointment } from '../../entities/appointment';
import { IAppointmentRepository } from '../i-appointment-repository';
import { areIntervalsOverlapping } from 'date-fns';

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlap = this.items.find(item =>
      areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt,
        },
        {
          start: item.startsAt,
          end: item.endsAt,
        },
        { inclusive: true }
      )
    );

    if (overlap instanceof Appointment) {
      return overlap;
    }

    return null;
  }
}
