import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import Table from './components/Table';

import "primereact/resources/themes/lara-light-cyan/theme.css";

        

function App() {
  return (
    <PrimeReactProvider>
      <Table/>
    </PrimeReactProvider>
  )
}

export default App
