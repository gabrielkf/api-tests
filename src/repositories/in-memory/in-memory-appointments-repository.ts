import { Appointment } from '../../entities/appointment';
import { IAppointmentRepository } from '../i-appointment-repository';
import { areIntervalsOverlapping } from 'date-fns';

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  public appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlap = this.appointments.find(appointment =>
      areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt,
        },
        {
          start: appointment.startsAt,
          end: appointment.endsAt,
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
