
import { useState } from "react";
import s from "./ColorGame.module.css";
import { getRandomColors, getStatus, rgbString, statusMessage } from "./utils";

function ColorGame() {
  const [numOfColors, setNumOfColors] = useState(6) ;
  const [colors, setColors] = useState(getRandomColors(numOfColors));
  const [attempts, setAttempts] = useState([]);

  const target = Math.floor(Math.random() * colors.length);

  function handleReset() {
    setAttempts([]);
    setColors(getRandomColors(numOfColors));
  }

  function handleChangeNumber(event) {
    const value = Number(event.target.value);

    setNumOfColors(value);
    setAttempts([]);
    setColors(getRandomColors(value));
  }

  const status = getStatus(attempts, target, numOfColors);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Color Game</h1>
      <p className={s.description}>
        Guess which color correspond to the following RGB code
      </p>

      <div className={s["rgb-wrapper"]}>{rgbString(colors[target])}</div>
      <div className={s.dashboard}>
        <div className={s["number-input"]}>
          <label htmlFor="colors"># Colors</label>
          <input
            id="colors"
            type="number"
            value={numOfColors}
            onChange={handleChangeNumber}
            step={3}
            min={3}
            max={9}
          />
        </div>
        <p className={s["game-status"]}>{statusMessage[status]}</p>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className={s.squares}>
        {colors.map((color, index) => {
          const backgroundColor = rgbString(color);
          const opacity = attempts.includes(index) ? "0" : "100";

          return (
            <button
              key={index}
              style={{ backgroundColor, opacity }}
              onClick={() => {
                /* completar */
              }}
              className={s.square}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default ColorGame;
