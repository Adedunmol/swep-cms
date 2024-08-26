import { object, string, TypeOf, number } from "zod";

export const createAppointmentSchema = object({
    body: object({
        doctorId: string({ required_error: "doctorId is required" }),
        phoneNumber: string({ required_error: "phoneNumber is required" }),
        availableDay: number({ required_error: "availableDay is required" }),
        availableMonth: string({ required_error: "availableMonth is required" }),
        email: string({ required_error: "Email is required" }).email("Not a valid email")
    })
})

export const getAppointmentSchema = object({
    params: object({
        id: string({ required_error: "id is required" })
    })
})

export type GetAppointmentInput = TypeOf<typeof getAppointmentSchema>
export type CreateAppointmentInput = TypeOf<typeof createAppointmentSchema>;