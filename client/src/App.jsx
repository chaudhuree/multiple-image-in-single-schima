import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ImageUpdate from './pages/ImageUpdate';
import ImageUploader from './pages/ImageUploader';
import ViewImage from './pages/ViewImage';

function App() {


  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<ViewImage />} />
          <Route path="/upload" element={<ImageUploader />} />
          <Route path="/update" element={<ImageUpdate />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
