import Restaurant from "../schemas/restuarant.schema.js";
import Zakaz from "../schemas/zakaz.schema.js"

class ZakazController {
    // CREATE (C in CRUD)
    static async createZakaz(req, res) {
        try {
            const {
                username,
                email,
                phone,
                date,
                time,
                num_people,
                message,
                res_id
            } = req.body;
            const newZakaz = new Zakaz({
                username,
                email,
                phone,
                date,
                time,
                num_people,
                message,
                res_id
            });
            await Restaurant.findByIdAndUpdate(req.body.res_id, {
                $push: {
                    zakaz: newZakaz._id
                }
            })
            const savedZakaz = await newZakaz.save();
            res.status(201).json({
                success: true,
                message: 'Zakaz yaratildi',
                zakaz: savedZakaz
            });
        } catch (err) {
            console.log('err :', err);
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // READ (R in CRUD)
    static async getAllZakaz(req, res) {
        try {
            const zakazlar = await Zakaz.find();
            res.status(200).json({
                success: true,
                zakazlar
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    static async getOneZakaz(req, res) {
        try {
            const zakaz = await Zakaz.findById(req.params.id);
            if (!zakaz) return res.status(404).json({
                success: false,
                message: 'Zakaz topilmadi'
            });
            res.status(200).json({
                success: true,
                zakaz
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    // UPDATE (U in CRUD)
    static async updateZakaz(req, res) {
        try {
            const {
                username,
                email,
                phone,
                date,
                time,
                num_people,
                message
            } = req.body;

            const updatedZakaz = await Zakaz.findByIdAndUpdate(
                req.params.id, {
                    username,
                    email,
                    phone,
                    date,
                    time,
                    num_people,
                    message
                }, {
                    new: true
                } // bu parametr bilan yangilangan zakazni qaytaradi
            );
            if (!updatedZakaz) return res.status(404).json({
                success: false,
                message: 'Zakaz topilmadi'
            });
            res.status(200).json({
                success: true,
                message: 'Zakaz yangilandi',
                zakaz: updatedZakaz
            });
        } catch (err) {
            console.log('err :', err);
            res.status(500).json({
                success: false,
                message: err.message
            });
        } 
    }

    // DELETE (D in CRUD)
    static async deleteZakaz(req, res) {
        try {
            const deletedZakaz = await Zakaz.findByIdAndDelete(req.params.id);
            if (!deletedZakaz) return res.status(404).json({
                success: false,
                message: 'Zakaz topilmadi'
            });
            res.status(200).json({
                success: true,
                message: 'Zakaz o`chirildi',
                zakaz: deletedZakaz
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}
export default ZakazController