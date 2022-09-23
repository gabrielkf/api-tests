import { Appointment } from '../../entities/appointment';
import { IAppointmentRepository } from '../i-appointment-repository';

export class InMemoryAppointmentRepository
  implements IAppointmentRepository
{
  public items: Appointment[] = [];

  create(appointment: Appointment): Promise<void> {
    return new Promise(resolve => this.items.push(appointment));
  }
}
