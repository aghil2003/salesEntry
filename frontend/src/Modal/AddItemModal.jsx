// import React, { useState } from 'react';
// import axios from 'axios';

// const AddItemModal = ({ isOpen, onClose, onItemAdded }) => {
//   const [itemCode, setItemCode] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await axios.post('/api/items', {
//         item_code: itemCode,
//         item_name: itemName,
//       });
//       setItemCode('');
//       setItemName('');
//       onItemAdded(); // refresh parent if needed
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.error || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
//         <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Item Code</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
//               value={itemCode}
//               onChange={(e) => setItemCode(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Item Name</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
//               value={itemName}
//               onChange={(e) => setItemName(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-600 text-sm">{error}</p>}
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Add Item'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddItemModal;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItemModal = ({ isOpen, onClose, onItemAdded }) => {
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchItemCode();
    }
  }, [isOpen]);

  const fetchItemCode = async () => {
    try {
      const res = await axios.get('http://localhost:5000/next-code');
      setItemCode(res.data.nextCode);
    } catch (err) {
      setError('Failed to load item code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/items', {
        item_code: itemCode,
        item_name: itemName,
      });
      setItemName('');
      onItemAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Code</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
              value={itemCode}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
