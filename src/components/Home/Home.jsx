import s from "./Home.module.css";
import reactIconUrl from "../../assets/react-icon-lg.svg";
import PropTypes from "prop-types";

function Home({setPage}) {

  return (
    <div className={s.wrapper}>
      <img src={reactIconUrl} />
      <h1 className={s.title}>React Evaluation</h1>
      <p className={s.name}>Nathaly Nunez</p>
      <div className={s.buttons}>
        <button
          onClick={() => {
            setPage("/color-game")
          }}
        >
          Color Game
        </button>
        <button
          onClick={() => {
            setPage("/doable")
          }}
        >
          Doable
        </button>
      </div>
    </div>
  );
}

Home.propTypes = {
  setPage: PropTypes.func.isRequired,
}

export default Home;
