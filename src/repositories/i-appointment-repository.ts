import { Appointment } from '../entities/appointment';

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<void>;
}
