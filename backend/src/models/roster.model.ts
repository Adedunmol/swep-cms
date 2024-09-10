import db from "../database";

interface CreateRoster {
    doctorId: string
    date: string
    shift: 'morning' | 'afternoon' | 'night'
}

class Roster{
    async createRoster(data: CreateRoster) {
        const [roster] = await db('rosters')
            .returning(['id', 'doctor_id', 'date', 'shift'])
            .insert({
            doctor_id: data.doctorId,
            date: data.date,
            shift: data.shift
        })

        const updatedRoster: any = roster

        return { ...updatedRoster }
    }

    async findRoster(id: string) {
        const roster = await db('rosters').where({ id })

        return roster[0]
    }

    async findAllRosters() {
        let rosters: any[]

        rosters = await db('rosters').where({})

        return rosters
    }

    async deleteRoster(id: string) {
        const roster = await db('rosters').where({ id }).del()

        return roster
    }

    async updateRoster(id: string, data: any) {
        const [roster] = await db('rosters').where({ id }).update({ ...data }).returning('*')

        return roster
    }

    async fetchScheduledDoctors(date: string) {
        const doctors = await db('rosters')
                                .select('rosters.*', 'doctors.*')
                                .leftJoin('doctors', 'rosters.doctor_id', 'doctors.id')
                                .where('rosters.date', date)
    
        return doctors
    }

    async fetchShiftScheduledDoctors(date: string, shift: 'morning' | 'afternoon' | 'evening') {
        // const doctors = await db('rosters')
        //                         .select('rosters.*', 'doctors.*')
        //                         .where('rosters.date', date)
        //                         .join('doctors', 'rosters.doctor_id', 'doctors.id')
        //                         // .andWhere('rosters.shift', shift)
        const doctors = await db('doctors')
  .select('doctors.id', 'doctors.email', 'doctors.name')
  .join('rosters', 'rosters.doctor_id', '=', 'doctors.id')
  .where('doctors.role', 'doctor')
  .andWhere('rosters.date', date)
  .andWhere('rosters.shift', shift);
        console.log(doctors)
        return doctors
    }

    async findScheduledDoctorForDate(doctorId: number, date: string) {
        const roster = await db('rosters').where({ doctor_id: doctorId }).andWhere({ date }).first()
        return roster
    }
}

export default new Roster()