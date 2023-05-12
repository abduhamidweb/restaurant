import express from "express";
import choose from "../controllers/choose.contr.js";

const router = express.Router();

// CREATE (C in CRUD)
router.post('/choose', choose.createZakaz);

// READ (R in CRUD)
router.get('/choose', choose.getAllZakaz);
router.get('/choose/:id', choose.getOneZakaz);

// UPDATE (U in CRUD)
router.put('/choose/:id', choose.updateZakaz);

// DELETE (D in CRUD)
router.delete('/choose/:id', choose.deleteZakaz);

export default router;