import { Response, Request } from 'express'
import { GetRecordInput, UpdateRecordInput } from '../schema/record.schema'
import recordService from '../services/record.service'


export const updateRecordController = async (req: Request<{}, {}, UpdateRecordInput['body']>, res: Response) => {
    try {
        //@ts-ignore
        const record = await recordService.updateRecord({ ...req.body, userId: req.user.id })

        return res.status(200).json({ status: 'success', message: 'record updated successfully', data: record })
    } catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: 'error', message: 'internal server error', data: null })
    }
}

export const getRecordController = async (req: Request<GetRecordInput['params']>, res: Response) => {
    try {
        //@ts-ignore
        const record = await recordService.getRecord(req.user.id)

        return res.status(200).json({ status: 'success', message: 'record gooten successfully', data: record })
    } catch (err: any) {
        console.log(err)
        return res.status(500).json({ status: 'error', message: 'internal server error', data: null })
    }
}
