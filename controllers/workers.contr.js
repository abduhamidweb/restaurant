import Restaurant from '../schemas/restuarant.schema.js';
import Worker from "../schemas/workers.schema.js";
import path from "path"
import fs from "fs"

function pathJoin(filename) {
    const newPath = filename.split(' ').join('-');
    return path.normalize(newPath);
}

class WorkerService {
    async getAllworkers() {
        try {
            const workers = await Worker.find({
                rol: {
                    $ne: 'admin'
                }
            });
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
            let userUploadusername = pathJoin(username + '' + random + '.' + type)

            await file.mv(
                path.join(
                    process.cwd(),
                    'public',
                    'imgs',
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
    async createworker2(data) {
        try {
            //   const worker = new Worker(data);
            const admin = await Worker.findOne({
                email: data.useremail,
                password: data.userpassword,
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

    async updateworker(id, req) {
        try {
            const {
                _id,
                username,
                email,
                password,
                userInfo,
                workingTime,
                userPhone,
                userPhoto,
                salary,
                rol,
                res_id,
            } = await Worker.findById(id);

            function isFile(filePath) {
                try {
                    return fs.statSync(filePath).isFile()
                } catch (error) {
                    return false
                }
            }
            // if (isFile(path.join(process.cwd(), 'public', 'imgs', userPhoto))) {
            //     fs.unlinkSync(path.join(process.cwd(), 'public', "imgs", userPhoto))
            // }
            let {
                file
            } = req.files;
            if (file.truncated) throw new Error('you must send max 50 mb file');
            let types = file.name.split('.');
            let type = types[types.length - 1]
            const random = Math.floor(Math.random() * 9000 + 1000)

            let userUploadusername = pathJoin(username + random + '.' + type)
            req.body.userPhoto = userUploadusername;
            // console.log('username+\'\' + random + \'.\' + type :', username + '' + random + '.' + type);
            // console.log('username :', username);
            if (file) {
                if (isFile(path.join(process.cwd(), 'public', 'imgs', userPhoto ? userPhoto : "oke"))) {
                    fs.unlinkSync(path.join(process.cwd(), 'public', "imgs", userPhoto)) 
                }
                await file.mv(
                    path.join(
                        process.cwd(),
                        'public',
                        'imgs',
                        userUploadusername
                    )
                )

            }
            let update = req.body;
            const worker = await Worker.findByIdAndUpdate(id, {
                username: update.username ? update.username : username,
                email: update.email ? update.email : email,
                password: update.password ? update.password : password,
                userInfo: update.userInfo ? update.userInfo : userInfo,
                workingTime: update.workingTime ? update.workingTime : workingTime,
                userPhoto: userUploadusername ? userUploadusername : userPhoto,
                userPhone: update.userPhone ? update.userPhone : userPhone,
                salary: update.salary ? update.salary : salary,
                rol: update.rol ? update.rol : rol,
                res_id: update.res_id ? update.res_id : res_id,
            }, {
                new: true
            });
            await worker.save();
            return worker
        } catch (err) {
            console.error('Error updating worker', err);
            throw new Error('Could not update worker');
        }
    }
    async deleteworker(id) {
        try {
            const worker = await Worker.findByIdAndDelete(id);
            return worker;
        } catch (err) {
            console.error('Error deleting worker', err);
            throw new Error('Could not delete worker');
        }
    }
}
export default WorkerService;