import {
  Appointment,
  AppointmentProps,
} from './../entities/appointment';

type CreateAppointmentRequest = AppointmentProps;
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    return new Appointment({
      customer,
      startsAt,
      endsAt,
    });
  }
}
