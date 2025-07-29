import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SalesEntry from './pages/SalesEntry';
import { Toaster } from 'react-hot-toast';

function App() {
  return (  
    <div>
      <Provider store={store}>
      <Toaster position="top-right" />
      <SalesEntry />
      </Provider>
    </div>
  );
}

export default App;
