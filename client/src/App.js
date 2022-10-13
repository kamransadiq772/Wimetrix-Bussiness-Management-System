import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Login';
import Main from './Components/Main'
import Worker from './Components/Worker/Worker';
import MachinType from './Components/MachineType/MachinType';
import Machine from './Components/Machine/Machine';
import Line from './Components/Line/Line';
import User from './Components/User/User';
import Fault from './Components/Fault/Fault';




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Main />} >
          <Route path='/main/user' element={<User />} />
          <Route path='/main/machine' element={<Machine />} />
          <Route path='/main/machineType' element={<MachinType />} />
          <Route path='/main/line' element={<Line />} />
          <Route path='/main/fault' element={<Fault />} />
          <Route path='/main/worker' element={<Worker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;