import { useEffect, useState } from "react";
import s from "./ColorGame.module.css";
import { getRandomColors, getStatus, rgbString, statusMessage } from "./utils";
import Button from "../Button/Button";

function ColorGame() {
  const [numOfColors, setNumOfColors] = useState(6);
  const [colors, setColors] = useState(getRandomColors(numOfColors));
  const [attempts, setAttempts] = useState([]);
  const [target, setTarget] = useState(Math.floor(Math.random() * colors.length));

  useEffect(() => {
    const newColors = getRandomColors(numOfColors);
    setColors(newColors);
    setTarget(Math.floor(Math.random() * newColors.length));
    setAttempts([]);
  }, [numOfColors]);

  function handleReset() {
    setAttempts([]);
    setColors(getRandomColors(numOfColors));
  }

  function handleChangeNumber(event) {
    const value = Number(event.target.value);

    if(value>=3 && value <= 9 && value % 3 ==0) {
      setNumOfColors(value);
    } else {
      alert("El valor ingresado no es válido. Debe ser 3, 6, o 9.")
    }

  }

  const status = getStatus(attempts, target, numOfColors);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Color Game</h1>
      <p className={s.description}>
        Guess which color correspond to the following RGB code
      </p>

      <div className={s["rgb-wrapper"]}>
      {rgbString(colors[target])
      .slice(4, -1)
      .split(', ')
      .map((value, index) => (
    <div key={index} className={s.rgb}  style={{
      borderColor: index === 0 ? 'red' : index === 1 ? 'green' : 'blue',
    }}>
      <p className={s.colorNumber}>{value}</p>
      <p>{index === 0 ? 'red' : index === 1 ? 'green' : 'blue'}</p>
    </div>
  ))}
      </div>
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
        <Button onClick={handleReset}>Reset</Button>
      </div>

      <div className={s.squares}>
        {colors.map((color, index) => {
          const backgroundColor =
            status === "win" || status === "lose"
              ? rgbString(colors[target])
              : rgbString(color);
              const opacity = (status === "playing" && attempts.includes(index)) ? "0" : "100";

          return (
            <button
              key={index}
              style={{ backgroundColor, opacity }}
              onClick={() => {
                if(status === "playing") {
                  setAttempts((prevAttempts) => [...prevAttempts, index]);
                }
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
