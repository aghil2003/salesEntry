// import React, { useState } from 'react';
// import {
//   RotateCcw,
//   Plus,
//   Save,
//   Send,
// } from 'lucide-react';
// import AddItemModal from '../Modal/AddItemModal';


// const FormActions = ({ onSubmit }) => {
//    const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
//         <button
//           type="button"
//           onClick={() => setModalOpen(true)}
//           className="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add items
//         </button>

//         <AddItemModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onItemAdded={() => {
//           // Reload items or give feedback
//           console.log('Item added!');
//         }}
//       />

//         <button
//           type="button"
//           className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <RotateCcw className="w-4 h-4 mr-2" />
//           Reset
//         </button>

//          <button
//           type="button"
//           className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <Save className="w-4 h-4 mr-2" />
//           Print
//         </button>

//         <button
//           type="button"
//           onClick={onSubmit}
//           className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <Send className="w-4 h-4 mr-2" />
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormActions;


import React, { useState } from 'react';
import {
  RotateCcw,
  Plus,
  Save,
  Send,
} from 'lucide-react';
import AddItemModal from '../Modal/AddItemModal';

const FormActions = ({ onSubmit, onPrint }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add items
        </button>

        <AddItemModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onItemAdded={() => {
            console.log('Item added!');
          }}
        />

        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </button>

        {/* 👇 Print Button with onPrint handler */}
        <button
          type="button"
          onClick={onPrint}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4 mr-2" />
          Print
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormActions;
