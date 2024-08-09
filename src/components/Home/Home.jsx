import s from "./Home.module.css";
import reactIconUrl from "../../assets/react-icon-lg.svg";
// import PropTypes from "prop-types";
import Button from "../Button/Button";
import { Link } from "react-router-dom";


function Home() {

  return (
    <div className={s.wrapper}>
      <img src={reactIconUrl} />
      <h1 className={s.title}>React Evaluation</h1>
      <p className={s.name}>Nathaly Nunez</p>
      <div className={s.buttons} >
        <Link to="/color-game">
        <Button
        variant="secondary"
        >
          Color Game
        </Button>
        </Link>
        <Link to="/doable">
        <Button
        variant="secondary"
        >
          Doable
        </Button>
        </Link>
      </div>
    </div>
  );
}


export default Home;
