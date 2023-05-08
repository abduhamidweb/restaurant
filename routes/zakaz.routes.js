import express from "express";
import ZakazController from "../controllers/zakaz.contr.js";

const router = express.Router();

// CREATE (C in CRUD)
router.post('/zakazlar', ZakazController.createZakaz);

// READ (R in CRUD)
router.get('/zakazlar', ZakazController.getAllZakaz);
router.get('/zakazlar/:id', ZakazController.getOneZakaz);

// UPDATE (U in CRUD)
router.put('/zakazlar/:id', ZakazController.updateZakaz);

// DELETE (D in CRUD)
router.delete('/zakazlar/:id', ZakazController.deleteZakaz);

export default router;
