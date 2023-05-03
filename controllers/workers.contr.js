import Restaurant from '../schemas/restuarant.schema.js';
import Worker from "../schemas/workers.schema.js";
import path from "path"
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
            const workers = await Worker.find({
                rol: "admin"
            });
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

    async createworker(req) {
        try {

            let {
                username
            } = req.body;
            let {
                file
            } = req.files;

            if (file.truncated) throw new Error('you must send max 50 mb file')
            let types = file.name.split('.')
            let type = types[types.length - 1]
            const random = Math.floor(Math.random() * 9000 + 1000)
            let userUploadusername = username + random + '.' + type
            await file.mv(
                path.join(
                    process.cwd(),
                    'public',
                    'avatar',
                    userUploadusername
                )
            )

            req.body.userPhoto = userUploadusername
            const worker = new Worker(req.body);
            await Restaurant.findByIdAndUpdate(req.body.res_id, {
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

    async isAdmin(data) {
        try {
            //   const worker = new Worker(data);

            const admin = await Worker.findOne({
                email: data.useremail,
                password: data.userpassword,
                rol: "admin"
            });
            return admin

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