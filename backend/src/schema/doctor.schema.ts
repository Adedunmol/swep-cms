import { object, string, TypeOf, input, enum as enum_ } from "zod";

export const createDoctorSchema = object({
    body: object({
        name: string({ required_error: "name is required" }),
        officeNumber: string({ required_error: "officeNumber is required" }),
        password: string({ required_error: "password is required" }),
        passwordConfirmation: string({ required_error: "passwordConfirmation is required" }),
        email: string({ required_error: "email is required" }).email("Not a valid email").refine((e) => e.includes("oauife"), { message: "Not a valid school email", path: ["email"] }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
})
export const loginDoctorSchema = object({
    body: object({
        password: string({ required_error: 'password is required' }),
        email: string({ required_error: "email is required" }).email("Not a valid email").refine((e) => e.includes("oauife"), { message: "Not a valid school email", path: ["email"] }),
    })
})

export const updateDoctorSchema = object({
    body: object({
        name: string().optional(),
        phoneNumber: string().optional()
    }),
    params: object({
        id: string()
    })
})

export type CreateDoctorInput = input<typeof createDoctorSchema>;
export type UpdateDoctorInput = input<typeof updateDoctorSchema>;
export type LoginDoctorInput = input<typeof loginDoctorSchema>;