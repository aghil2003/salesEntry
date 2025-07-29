import React, { forwardRef } from 'react';

const PrintVoucher = forwardRef(({ header = {}, detail = [], onBack  }, ref) => {
  const totalAmount = detail?.reduce((sum, item) => sum + item.qty * item.rate, 0) || 0;

  return (
    <div ref={ref} className="p-6 text-sm font-sans w-full">
      <div className="mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Entry Form
        </button>
      </div>
      
      <h2 className="text-center text-2xl font-bold mb-6">Sales Voucher</h2>
    
      {/* Header Info */}
      <table className="w-full mb-6 border border-collapse text-left">
        <tbody>
          <tr>
            <td className="border p-2 font-semibold">Vr No</td>
            <td className="border p-2">{header?.vr_no || ''}</td>
            <td className="border p-2 font-semibold">Vr Date</td>
            <td className="border p-2">{header?.vr_date || ''}</td>
            <td className="border p-2 font-semibold">Status</td>
            <td className="border p-2">{header?.status || ''}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Ac Name</td>
            <td className="border p-2" colSpan="3">{header?.ac_name || ''}</td>
            <td className="border p-2 font-semibold">Ac Amt</td>
            <td className="border p-2">{Number(header?.ac_amt || 0).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Detail Info */}
      <h3 className="text-lg font-semibold mb-2">Detail</h3>
      <table className="w-full border border-collapse text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr No</th>
            <th className="border p-2">Item Code</th>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2 text-right">Qty</th>
            <th className="border p-2 text-right">Rate</th>
            <th className="border p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {detail?.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.item_code}</td>
              <td className="border p-2">{item.item_name}</td>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2 text-right">{item.qty}</td>
              <td className="border p-2 text-right">{item.rate}</td>
              <td className="border p-2 text-right">{(item.qty * item.rate).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="6" className="border p-2 text-right font-bold">Total:</td>
            <td className="border p-2 text-right font-bold">{totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default PrintVoucher;


