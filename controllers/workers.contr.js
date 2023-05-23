import Restaurant from '../schemas/restuarant.schema.js';
import Worker from "../schemas/workers.schema.js";
import path from "path"
import fs from "fs"
import {
    sendConfirmationEmail
} from '../utils/nodemailer.js';

function pathJoin(filename) {
    const newPath = filename.split(' ').join('-');
    return path.normalize(newPath);
}

function isFile(filePath) {
    try {
        return fs.statSync(filePath).isFile()
    } catch (error) {
        return false
    }
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
                username,
                email
            } = req.body;
            sendConfirmationEmail(email, 'Everything is chook GUZAL')
            let {
                file
            } = req.files;
            if (file.truncated) throw new Error('you must send max 50 mb file')
            let types = file.name.split('.')
            let type = types[types.length - 1]
            const random = Math.floor(Math.random() * 9000 + 1000);
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
            const worker = new Worker(data);
            await worker.save();
            return worker;
        } catch (err) {
            console.error('Error creating worker', err);
            throw new Error('Could not create worker');
        }
    }
    async registerworker(data) {
        try {
            const worker = await Worker.findOne({
                email: data.useremail,
                password: data.userpassword,
            });
            return worker;
        } catch (err) {
            console.error('Error getting worker', err);
            throw new Error('Could not get worker');
        }
    }

    async updateworker(id, req) {
        try {
            if (req.files) {
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
                if (isFile(path.join(process.cwd(), 'public', 'imgs', userPhoto ? userPhoto : ""))) {
                    fs.unlinkSync(path.join(process.cwd(), 'public', "imgs", userPhoto ? userPhoto : ""))
                }
                let {
                    file
                } = req.files;
                if (file.truncated) throw new Error('you must send max 50 mb file');
                let types = file.name.split('.');
                let type = types[types.length - 1];
                const random = Math.floor(Math.random() * 9000 + 1000)
                let userUploadusername = pathJoin(username + random + '.' + type)
                req.body.userPhoto = userUploadusername;
            
                let update = req.body;
                const worker = await Worker.findByIdAndUpdate(id, {
                    username: update.username ? update.username : username,
                    email: update.email ? update.email : email,
                    password: update.password ? update.password : password,
                    userInfo: update.userInfo ? update.userInfo : userInfo,
                    workingTime: update.workingTime ? update.workingTime : workingTime,
                    userPhone: update.userPhone ? update.userPhone : userPhone,
                    userPhoto: update.userPhoto ? update.userPhoto : userPhoto,
                    salary: update.salary ? update.salary : salary,
                    rol: update.rol ? update.rol : rol,
                    res_id: update.res_id ? update.res_id : res_id,
                }, {
                    new: true
                });
                await worker.save();
                    await file.mv(
                        path.join(
                            process.cwd(),
                            'public',
                            'imgs',
                            userUploadusername
                        )
                    )
                return worker;
            } else {
                const worker = await Worker.findByIdAndUpdate(id, req.body, {
                    new: true
                });
                await worker.save();
                return worker;
            }
        } catch (err) {
            return err
        }
    }
    async updateworker2(id, req) {
        try {
            const {
                _id,
                email,
            } = await Worker.findById(id);
            let update = req.body;
            const worker = await Worker.findByIdAndUpdate(id, {
                email: update.email ? update.email : email,
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
            if (isFile(path.join(process.cwd(), 'public', 'imgs', worker.userPhoto ? worker.userPhoto : ''))) {
                fs.unlinkSync(path.join(process.cwd(), 'public', "imgs", worker.userPhoto ? worker.userPhoto : ""))
            }
            return worker;
        } catch (err) {
            console.error('Error deleting worker', err);
            throw new Error('Could not delete worker');
        }
    }
}
export default WorkerService;