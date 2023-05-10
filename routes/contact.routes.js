import express from "express";
import ZakazController from "../controllers/contact.contr.js";

const router = express.Router();

// CREATE (C in CRUD)
router.post('/contact', ZakazController.createZakaz);

// READ (R in CRUD)
router.get('/contact', ZakazController.getAllZakaz);
router.get('/contact/:id', ZakazController.getOneZakaz);
// UPDATE (U in CRUD)
router.put('/contact/:id', ZakazController.updateZakaz);

// DELETE (D in CRUD)
router.delete('/contact/:id', ZakazController.deleteZakaz);

export default router;