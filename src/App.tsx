import './App.css'
import { Routes, HashRouter ,Route} from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';

function App() {

  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Homepage/>} />
      </Routes>
    </HashRouter>
  );
}

export default App
