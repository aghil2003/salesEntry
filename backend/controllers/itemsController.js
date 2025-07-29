
import { ItemMaster } from '../models/index.js';


const getAllItems = async (req, res) => {
  try {
    const items = await ItemMaster.findAll({
      attributes: ['item_code', 'item_name'],
      order: [['item_code', 'ASC']],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

const getNextItemCode = async (req, res) => {    
  try {
    const lastItem = await ItemMaster.findOne({
      order: [['item_code', 'DESC']]
    });

    let nextCode = 'ITM001';
    if (lastItem && lastItem.item_code) {
      const lastNumber = parseInt(lastItem.item_code.replace(/\D/g, ''), 10); // extract 001, 002, etc.
      const nextNumber = lastNumber + 1;
       nextCode = 'ITM' + String(nextNumber).padStart(3, '0'); // ITM011
    }

    return res.json({ nextCode });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: 'Failed to generate item code' });
  }
};

 const addItem = async (req, res) => {
  const { item_code, item_name } = req.body;

  if (!item_code || !item_name) {
    return res.status(400).json({ error: 'Item code and name are required' });
  }

  try {
    const newItem = await ItemMaster.create({ item_code, item_name });
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

const Item={
    getAllItems,getNextItemCode,addItem
}

export default Item;