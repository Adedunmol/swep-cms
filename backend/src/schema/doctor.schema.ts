import { object, string, TypeOf, input, enum as enum_ } from "zod";

export const createDoctorSchema = object({
    body: object({
        name: string({ required_error: "name is required" }),
        phoneNumber: string({ required_error: "phoneNumber is required" }),
        password: string().optional(),
        passwordConfirmation: string().optional(),
        email: string({ required_error: "email is required" }).email("Not a valid email").refine((e) => e.includes("oauife"), { message: "Not a valid school email", path: ["email"] }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
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