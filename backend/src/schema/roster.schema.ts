import { object, string, TypeOf, input, enum as enum_ } from "zod";

export const updateRosterSchema = object({
    body: object({
        date: string().optional(),
        shift: enum_(['morning', 'afternoon', 'night']).optional()
    }),
    params: object({
        id: string()
    })
})

export type UpdateRosterInput = input<typeof updateRosterSchema>;