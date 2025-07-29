// routes/items.js
import express from 'express';
import Item from '../controllers/itemsController.js';

const router = express.Router();

router.get('/items', Item.getAllItems);
router.get('/next-code', Item.getNextItemCode);
router.post('/items', Item.addItem);
export default router;
