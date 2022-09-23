import { IAppointmentRepository } from './../repositories/i-appointment-repository';
import { Appointment, AppointmentProps } from './../entities/appointment';

type CreateAppointmentRequest = AppointmentProps;
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointsRepository: IAppointmentRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment instanceof Appointment) {
      throw new Error('Overlapping appointment');
    }

    return new Appointment({
      customer,
      startsAt,
      endsAt,
    });
  }
}
