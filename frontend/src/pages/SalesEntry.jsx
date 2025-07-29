import React, { useState, useEffect , useRef } from 'react';
import HeaderForm from '../components/HeaderForm';
import DetailTable from '../components/DetailTable';
import FormActions from '../components/action';
import PrintVoucher from '../components/PrintVoucher';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import toast from 'react-hot-toast';

const SalesEntry = () => {
  const [showPrint, setShowPrint] = useState(false);

  const [header, setHeader] = useState({
    vrNo: '',
    date: '2025-07-26',
    acName: 'Aghil',
    status: 'Draft',
    ac_amt: 0
  });

  const [details, setDetails] = useState([
    { sr_no: 1, itemCode: '', itemName: '', description: '', qty: 0, rate: 0 }
  ]);

  useEffect(() => {
    axios.get('http://localhost:5000/next-voucher')
      .then(res => {
        const newVrNo = res.data.voucher;
        console.log(newVrNo);
        setHeader(prev => ({ ...prev, vrNo: newVrNo }));
      })
      .catch(err => console.error(err));
  }, []);

  const handleHeaderChange = (field, value) => {
    setHeader(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDetailsChange = (newDetails) => {
    setDetails(newDetails);
    const totalAmount = newDetails.reduce((sum, d) => sum + d.qty * d.rate, 0);
    setHeader(prev => ({ ...prev, ac_amt: totalAmount }));
  };

  const handleSubmit = async () => {
    const payload = {
      header_table: {
        vr_no: header.vrNo,
        vr_date: header.date,
        ac_name: header.acName,
        status: header.status,
        ac_amt: header.ac_amt
      },
      detail_table: details.map(d => ({
                 sr_no: d.sr_no,
                 item_code: d.itemCode,
                 item_name: d.itemName,
                 description: d.description,
                 qty: d.qty,
                 rate: d.rate,
                 amount: d.qty * d.rate,
                 vr_no: header.vrNo   
                }))
     };

    try {
      const response = await axios.post('http://localhost:5000/header/multiple', payload);
      toast.success('Sales entry saved successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to save sales entry');
    }
  };

   const printRef = useRef();

  const handlePrint = async () => {
  setShowPrint(true);
  // setTimeout(() => {
  //   printFunction();
  // }, 0);
};

// const printFunction = useReactToPrint({
//   content: () => printRef.current,
//   documentTitle: `Sales_Voucher_${header.vrNo}`,
//   onAfterPrint: () => setShowPrint(false)
// });

  return (
    <div className="p-6">
      {!showPrint ? (
        <>
          <HeaderForm header={header} onHeaderChange={handleHeaderChange} />
          <DetailTable details={details} onDetailsChange={handleDetailsChange} />
          <FormActions onSubmit={handleSubmit} onPrint={handlePrint} />

        </>
      ) : (
         <PrintVoucher
         ref={printRef}
  header={{
    vr_no: header.vrNo,
    vr_date: header.date,
    ac_name: header.acName,
    status: header.status,
    ac_amt: header.ac_amt
  }}
  detail={details.map(d => ({
    sr_no: d.sr_no,
    item_code: d.itemCode,
    item_name: d.itemName,
    description: d.description,
    qty: d.qty,
    rate: d.rate
  }))}
   onBack={() => {
    // toast('Returned to Sales Entry form');
    setShowPrint(false);
   }
   }
/>

      )}
    </div>
  );
};

export default SalesEntry;
