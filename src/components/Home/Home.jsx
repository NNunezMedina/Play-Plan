import s from "./Home.module.css";
import reactIconUrl from "../../assets/react-icon-lg.svg";
import PropTypes from "prop-types";
import Button from "../Button/Button";

function Home({setPage}) {

  return (
    <div className={s.wrapper}>
      <img src={reactIconUrl} />
      <h1 className={s.title}>React Evaluation</h1>
      <p className={s.name}>Nathaly Nunez</p>
      <div className={s.buttons} >
        <Button
        variant="secondary"
          onClick={() => {
            setPage("/color-game")
          }}
        >
          Color Game
        </Button>
        <Button
        variant="secondary"
          onClick={() => {
            setPage("/doable")
          }}
        >
          Doable
        </Button>
      </div>
    </div>
  );
}

Home.propTypes = {
  setPage: PropTypes.func.isRequired,
}

export default Home;
