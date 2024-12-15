import MetamaskStart from './components/MetamaskStart/MetamaskStart';
import MetamaskTokenTransferInfo from './components/MetamaskTokenTransferInfo/MetamaskTokenTransferInfo';

import './App.css';

function App() {
  return (
    <div className='main'>
      <MetamaskStart />
      <MetamaskTokenTransferInfo />
    </div>
  );
};

export default App;
