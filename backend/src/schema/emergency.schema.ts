import { object, string, TypeOf, boolean, number } from "zod";

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

export const getEmergencySchema = object({
    params: object({
        id: string({ required_error: "id is required" })
    })
})

export type GetEmergencyInput = TypeOf<typeof getEmergencySchema>
export type CreateEmergencyInput = TypeOf<typeof createEmergencySchema>;