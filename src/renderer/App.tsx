/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import PasswordGenerator from '../utils/generatePw';
// import icon from '../../assets/icon.svg';
const MAX_LENGTH = 16;
const MIN_LENGTH = 8;

function Index() {
  const lengths = Array(MAX_LENGTH - MIN_LENGTH + 1)
    .fill(0)
    .map((_, i) => MIN_LENGTH + i);

  const [length, setLength] = useState(MIN_LENGTH);
  const [symbol, setSymbol] = useState(true);
  const [number, setNumber] = useState(true);
  const [lowercase, setLowerCase] = useState(true);
  const [uppercase, setUpperCase] = useState(true);
  const [ambiguous, setAmbiguous] = useState(true);
  const [similar, setSimilar] = useState(true);
  const [password, setPassword] = useState('');

  const generator = new PasswordGenerator();
  const onClickGenerate = () => {
    if (
      !symbol &&
      !number &&
      !lowercase &&
      !uppercase &&
      !ambiguous &&
      !similar
    ) {
      return;
    }
    setPassword(
      generator.generate({
        length,
        symbol,
        number,
        lowercase,
        uppercase,
        ambiguous,
        similar,
      }),
    );
  };

  const onClickCopy = () => {
    navigator.clipboard.writeText(password);
  };
  return (
    <div className="flex justify-center">
      <div className="prose ">
        <h1>Password Generator</h1>
        <div className="grid grid-cols-2">
          <label>Length</label>
          <select onChange={(e) => setLength(Number(e.target.value))}>
            {lengths.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <label>Include Symbols</label>
          <label>
            <input
              type="checkbox"
              checked={symbol}
              onChange={(e) => setSymbol(e.target.checked)}
            />
            (e.g. @#$%)
          </label>
          <label>Include number</label>
          <label>
            <input
              type="checkbox"
              checked={number}
              onChange={(e) => setNumber(e.target.checked)}
            />
            (e.b. 0123456789)
          </label>
          <label>Include LowerCase Characters</label>
          <label>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowerCase(e.target.checked)}
            />
            (e.g. abcdefghijklmnopqrstuvwxyz)
          </label>
          <label>Include UpperCase Characters</label>
          <label>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUpperCase(e.target.checked)}
            />
            (e.g. ABCDEFGHIJKLMNOPQRSTUVWXYZ)
          </label>
          <label>Exclude Similar Characters</label>
          <label>
            <input
              type="checkbox"
              checked={similar}
              onChange={(e) => setSimilar(e.target.checked)}
            />
            (e.g. i,l,1,L,o,0,O)
          </label>
          <label>Exclude Ambiguous Characters</label>
          <label>
            <input
              type="checkbox"
              checked={ambiguous}
              onChange={(e) => setAmbiguous(e.target.checked)}
            />
            {`(e.g. {}[]()/\\'"~,;:.<>)`}
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onClickGenerate}
        >
          Generate
        </button>
        <div>
          <span>{password}</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClickCopy}
          >
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
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}
