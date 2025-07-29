import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Package, IndianRupee } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../redux/itemSlice';

const DetailSection = ({ details, onDetailsChange }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.list);
  const loading = useSelector((state) => state.items.loading);
  const error = useSelector((state) => state.items.error);


  useEffect(() => {
  dispatch(fetchItems());
}, [dispatch]);


  const handleDetailChange = (index, field, value) => {
    const updated = [...details];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    if (field === 'itemCode') {
      const selectedItem = items.find(item => item.item_code === value);
      updated[index].itemName = selectedItem ? selectedItem.item_name : '';
    }

    onDetailsChange(updated);
  };

  const handleAddRow = () => {
    onDetailsChange([
      ...details,
      {
        sr_no: details.length + 1,
        itemCode: '',
        itemName: '',
        description: '',
        qty: 0,
        rate: 0
      }
    ]);
  };

  const handleRemoveRow = (index) => {
    if (details.length === 1) return;
    const updated = details.filter((_, i) => i !== index);
    onDetailsChange(updated);
  };

  const grandTotal = details.reduce((total, d) => total + d.qty * d.rate, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Package className="text-indigo-600 mr-3" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Sales Details</h2>
        </div>
        <button
          onClick={handleAddRow}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={16} className="mr-2" />
          Add Row
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-1 text-left">Sr No</th>
              <th className="border px-1 text-left">Item Code</th>
              <th className="border px-1 text-left">Item Name</th>
              <th className="border px-1 text-left">Description</th>
              <th className="border px-1 text-left">Qty</th>
              <th className="border px-1 text-left">Rate</th>
              <th className="border px-1 text-left">Amount</th>
              <th className="border px-1 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-1">{detail.sr_no}</td>
                <td className="border px-1">
                  <select
                    value={detail.itemCode}
                    onChange={(e) => handleDetailChange(index, 'itemCode', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="">Select Item</option>
                    {items.map(item => (
                      <option key={item.item_code} value={item.item_code}>
                        {item.item_code}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-1">
                  <input
                    type="text"
                    value={detail.itemName}
                    readOnly
                    className="w-full border rounded px-2 py-1 bg-gray-100"
                  />
                </td>
                <td className="border px-1">
                  <textarea
                    value={detail.description}
                    onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    rows={1}
                  />
                </td>
                <td className="border px-1">
                  <input
                    type="number"
                    step="0.001"
                    value={detail.qty}
                    onChange={(e) => handleDetailChange(index, 'qty', parseFloat(e.target.value) || 0)}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="border px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    value={detail.rate}
                    onChange={(e) => handleDetailChange(index, 'rate', parseFloat(e.target.value) || 0)}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="border px-4 py-2 text-right font-semibold">
                  ₹{(detail.qty * detail.rate).toFixed(2)}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    disabled={details.length === 1}
                    className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-green-800 font-medium">Total Rows:</span>
            <span className="text-lg text-green-900 font-bold">{details.length}</span>
            <span className="text-sm text-green-800 font-medium">Grand Total:</span>
            <span className="text-xl text-green-900 font-bold flex items-baseline">
              <IndianRupee size={18} className="mr-2 text-green-900" />
              {grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
