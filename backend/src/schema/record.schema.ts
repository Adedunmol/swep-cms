import { object, string, TypeOf, number } from "zod";

export const updateRecordSchema = object({
    body: object({
        bloodType: string().optional(),
        age: number().optional(),
        genotype: string().optional(),
        criticalIllness: string().optional(),
        physicalDisabilities: string().optional(),
        emergencyPhoneNumber: string().optional()
    })
})

export const getRecordSchema = object({
    params: object({
        id: string({ required_error: "id is required" })
    })
})

export type GetRecordInput = TypeOf<typeof getRecordSchema>
export type UpdateRecordInput = TypeOf<typeof updateRecordSchema>;