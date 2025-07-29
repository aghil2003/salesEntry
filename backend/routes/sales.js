
import express from 'express';
const router = express.Router();

import salesController from '../controllers/salesController.js';

router.post('/header/multiple', salesController.insertSalesEntry);
router.get('/next-voucher', salesController.getNextVoucherNumber);

export const salesRoutes = router;
