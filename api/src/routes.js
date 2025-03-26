import express from 'express';
import AbsenceController from './controllers/AbsenceController.js';

const router = express.Router();

router.get('/absences', AbsenceController.getAbsences)
router.get('/absences/:id', AbsenceController.validate('getAbsenceById'), AbsenceController.getAbsenceById)

export default router;
