import { object, string, TypeOf, boolean } from "zod";

export const createEmergencySchema = object({
    body: object({
        name: string({ required_error: "name is required" }),
        address: string({ required_error: "address is required" }),
        problem: string({ required_error: "problem is required" }),
        firstAid: boolean().optional(),
        onlineMed: boolean().optional(),
        ambulance: boolean().optional()
    })
})

export type CreateEmergencyInput = TypeOf<typeof createEmergencySchema>;