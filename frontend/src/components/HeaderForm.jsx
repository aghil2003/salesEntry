// import React from 'react';
// // import { useAppSelector } from '../hooks/useAppSelector';
// // import { useAppDispatch } from '../hooks/useAppDispatch';
// // import { updateHeader } from '../store/slices/salesSlice';
// import { Calendar, User, DollarSign} from 'lucide-react';

// const HeaderSection = ({ header, onHeaderChange }) => {
// //   const dispatch = useAppDispatch();
// //   const { header } = useAppSelector((state) => state.sales);
//  const header= {
//     vrNo: 'VR001',
//     date: '2025-07-26',
//     acName: 'Aghil',
//     status: 'Draft',
//   }

//   const handleHeaderChange = (field, value) => {
//     dispatch(updateHeader({ [field]: value }));
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-1 mt-4 mb-4">
//       <div className="flex items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Sales Voucher Header</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="space-y-2">
//           <label className="flex items-center text-sm font-medium text-gray-700">
//             <DollarSign size={16} className="mr-2 text-blue-600" />
//             Voucher No.
//           </label>
//           <input
//             type="number"
//             value={header.vrNo}
//             onChange={(e) => onHeaderChange('vrNo', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             placeholder="Auto-generated"
//             readOnly
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="flex items-center text-sm font-medium text-gray-700">
//             <Calendar size={16} className="mr-2 text-blue-600" />
//             Voucher Date
//           </label>
//           <input
//             type="date"
//             value={header.date}
//             onChange={(e) => handleHeaderChange('vr_date', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="flex items-center text-sm font-medium text-gray-700">
//             <User size={16} className="mr-2 text-blue-600" />
//             Account Name
//           </label>
//           <input
//             type="text"
//             value={header.acName}
//             onChange={(e) => handleHeaderChange('ac_name', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             placeholder="Enter account name"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Status</label>
//           <select
//             value={header.status}
//             onChange={(e) => handleHeaderChange('status', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//           >
//             <option value="A">Approved</option>
//             <option value="I">Not Approved</option>
//           </select>
//         </div>
//       </div>

//       <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium text-blue-800">Total Amount:</span>
//           <span className="text-xl font-bold text-blue-900">
//             ${header.ac_amt?.toFixed(2) || '0.00'}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderSection;



import {useEffect,useState} from 'react';
import { Calendar, User, IndianRupee } from 'lucide-react';
import axios from "axios";

const HeaderSection = ({ header, onHeaderChange }) => {

  const[VrNumber,SetVrNumber]=useState("vr001")
  const handleInputChange = (field, value) => {
    if (onHeaderChange) {
      onHeaderChange(field, value);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/next-voucher')
      .then(res => {
        const newVrNo = res.data.voucher;
        console.log(newVrNo)
        SetVrNumber(newVrNo);
        // setHeader(prev => ({ ...prev, vrNo: newVrNo }));
      })
      .catch(err => console.error(err));
  }, []);

  

  return (
    <div className="bg-white rounded-lg shadow-md p-1 mt-4 mb-4">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sales Voucher Header</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <IndianRupee size={16} className="mr-2 text-blue-600" />
            Voucher No.
          </label>
          <input
            type="text"
            value={VrNumber || ''}
            onChange={(e) => handleInputChange('vrNo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Auto-generated"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar size={16} className="mr-2 text-blue-600" />
            Voucher Date
          </label>
          <input
            type="date"
            value={header?.date || ''}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <User size={16} className="mr-2 text-blue-600" />
            Account Name
          </label>
          <input
            type="text"
            value={header?.acName || ''}
            onChange={(e) => handleInputChange('acName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter account name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={header?.status || 'Draft'}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="Not Approved">Not Approved</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-800">Total Amount:</span>
          <span className="text-xl font-bold text-blue-900 flex items-baseline">
            <IndianRupee size={16} className="mr-2 " />
            {header?.ac_amt?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
