import { HeaderTable, DetailTable, sequelizeInstance } from '../models/index.js';

const insertSalesEntry = async (req, res) => {
  const { header_table, detail_table } = req.body;

  const transaction = await sequelizeInstance.transaction();

  try {
    const header = await HeaderTable.create(header_table, { transaction });

    for (let i = 0; i < detail_table.length; i++) {
      detail_table[i].vr_no = header.vr_no;
    }

    await DetailTable.bulkCreate(detail_table, { transaction });

    await transaction.commit();
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
   console.error(' Error during insertSalesEntry:', error);
  console.error(' Request Body:', JSON.stringify(req.body, null, 2));
  await transaction.rollback();
  res.status(500).json({ error: 'Failed to insert data', details: error.message });
  }
};

const getNextVoucherNumber = async (req, res) => {
  try {
    const count = await HeaderTable.count(); // Get total number of records
    const nextNumber = count + 1;

    // Format as VR001, VR002, etc.
    const paddedNumber = String(nextNumber).padStart(3, '0');
    const nextVoucher = `VR${paddedNumber}`;

    res.status(200).json({ voucher: nextVoucher });
  } catch (error) {
    console.error('Error generating voucher number:', error);
    res.status(500).json({ error: 'Failed to generate voucher number' });
  }
};

const salesController={
    insertSalesEntry,getNextVoucherNumber
}

export default salesController;

