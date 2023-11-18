import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import icon from '../../assets/icon.svg';

function Hello() {
  return (
    <div>
      <div className="prose ">
        <h1>Password Generator</h1>
        <form id="form">
          <label htmlFor="form">
            <input type="checkbox" />
            <ul>
              <li>length 12</li>
              <li>include at least one charactor</li>
              <li>include at least one number</li>
            </ul>
          </label>
        </form>
        <button type="button" className="btn btn-primary">
          Generate
        </button>
        <div>
          <span>password</span>
          <button type="button" className="btn btn-primary">
            Copy
          </button>
        </div>
        {/* <img width="200" alt="icon" src={icon} /> */}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
