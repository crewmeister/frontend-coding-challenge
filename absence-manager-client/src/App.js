import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import logo from "./logo.svg";
import "./App.css";

import { fetchAbsences } from "./state/actions/absences";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbsences());
  }, []);

  const absences = useSelector(state => state.absences.data);

  return (
    <div className="App">
      <header className="App-header">
        <ol>
          {
            absences.map(absence => (<li>{ absence.id } - { absence.userId } - { absence.startDate } - { absence.endDate } - { absence.type }</li>))
          }
        </ol>
      </header>
    </div>
  );
}

export default App;
