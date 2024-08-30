import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        firstName: string({ required_error: "firstName is required" }),
        lastName: string({ required_error: "lastName is required" }),
        password: string({ required_error: "password is required" }).min(6, "Password too short - should be 6 chars"),
        passwordConfirmation: string({ required_error: "passwordConfirmation is required" }),
        email: string({ required_error: "email is required" }).email("Not a valid email").refine((e) => e.includes("oauife"), { message: "Not a valid school email", path: ["email"] }),
        role: string().optional().default("staff")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
})

export const loginUserSchema = object({
    body: object({
        email: string({ required_error: "email is required" }),
        password: string({ required_error: "password is required" })
    })
})

export type LoginUserInput = TypeOf<typeof loginUserSchema>
export type CreateUserInput = TypeOf<typeof createUserSchema>;