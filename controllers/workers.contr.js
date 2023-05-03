import Restaurant from '../schemas/restuarant.schema.js';
import Worker from "../schemas/workers.schema.js";
class WorkerService {
    async getAllworkers() {
        try {
            const workers = await Worker.find();
            return workers;
        } catch (err) {
            console.error('Error getting workers', err);
            throw new Error('Could not get workers');
        }
    }
        async getAlladmin() {
            try {
                const workers = await Worker.find({rol:"admin"});
                return workers;
            } catch (err) {
                console.error('Error getting workers', err);
                throw new Error('Could not get workers');
            }
        }

    async getworkerById(id) {
        try {
            const worker = await Worker.findById(id);
            return worker;
        } catch (err) {
            console.error('Error getting worker', err);
            throw new Error('Could not get worker');
        }
    }

    async createworker(data) {
        try {
            const worker = new Worker(data);
            await Restaurant.findByIdAndUpdate(data.res_id, {
                $push: {
                    workers: worker._id
                }
            })
            await worker.save();
            return worker;
        } catch (err) {
            console.error('Error creating worker', err);
            throw new Error('Could not create worker');
        }
    }
    async registerworker(data) {
        try {
            const worker = await worker.find({
                email: data.workeremail,
                password: data.workerpassword,
                rol: "admin"
            });
            if (worker.length > 0) return worker;
            else return "Siz admin emasizz"
            // return worker;
        } catch (err) {
            console.error('Error getting worker', err);
            throw new Error('Could not get worker');
        }
    }

    async updateworker(id, data) {
        try {
            const worker = await worker.findByIdAndUpdate(id, data, {
                new: true
            });
            return worker;
        } catch (err) {
            console.error('Error updating worker', err);
            throw new Error('Could not update worker');
        }
    }

    async deleteworker(id) {
        try {
            const worker = await worker.findByIdAndDelete(id);
            return worker;
        } catch (err) {
            console.error('Error deleting worker', err);
            throw new Error('Could not delete worker');
        }
    }
}

export default WorkerService