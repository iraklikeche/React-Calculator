import React, { useState, useRef, useEffect } from "react";
import "./Calculator.css";

const values = [
  "1",
  "2",
  "3",
  "+",
  "4",
  "5",
  "6",
  "-",
  "7",
  "8",
  "9",
  "*",
  ".",
  "0",
  "/"
];

function Calculator() {
  const [result, setResult] = useState(0);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  function handleClick(event) {
    const value = event.target.value;
    setInput(input + value);
  }

  function calculate() {
    const equation = input;
    setInput("");
    setResult(eval(equation));
  }

  function clear() {
    setInput("");
    setResult(0);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="calculator">
      <button className="clear" onClick={clear} value="C">
        C
      </button>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          ref={inputRef}
          value={result === 0 ? input : result}
          style={{ fontWeight: result === 0 ? "normal" : "bold" }}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") calculate();
            if (event.key === "Backspace") clear();
          }}
        />
      </div>

      <div className="col">
        <div>
          {values.map((value) => {
            let className = "operator";
            let onClick = handleClick;
            if (
              value === "+" ||
              value === "-" ||
              value === "*" ||
              value === "/"
            ) {
              className = "operator";
            } else if (value === "=") {
              className = "special";
              onClick = calculate;
            }
            return (
              <button
                key={value}
                className="operator"
                onClick={onClick}
                value={value}
              >
                {value}
              </button>
            );
          })}
          <button onClick={calculate} value="=">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
