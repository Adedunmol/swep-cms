import { object, string, TypeOf, boolean, enum as enum_, number } from "zod";

export const createEmergencySchema = object({
    body: object({
        name: string({ required_error: "name is required" }),
        address: string({ required_error: "address is required" }),
        problem: string({ required_error: "problem is required" }),
        firstAid: boolean().optional(),
        onlineMed: boolean().optional(),
        ambulance: boolean().optional(),
        priority: string().optional().default('1')
    })
})

export const getEmergencySchema = object({
    params: object({
        id: string({ required_error: "id is required" })
    })
})

export const updateEmergencySchema = object({
    params: object({
        id: string({ required_error: "id is required" })
    }),
    body: object({
        priority: enum_(['1', '2', '3'])
    })
})

export type GetEmergencyInput = TypeOf<typeof getEmergencySchema>
export type CreateEmergencyInput = TypeOf<typeof createEmergencySchema>;
export type UpdateEmergencyInput = TypeOf<typeof updateEmergencySchema>;