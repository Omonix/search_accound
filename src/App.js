import { useState } from "react";
import "./App.css";
import Icon from "./img/icon/icon.png";
import FinalLogo from "./img/logo/finalLogo.png";
import ComputerLogo from "./img/icon/kisspng-cut-copy-and-paste-computer-icons-button-paster-5b307cb621a6a8.2857673315299043101378.png";
import PasterLogo from "./img/icon/kisspng-cut-copy-and-paste-computer-icons-button-paster-5b307cb621a6a8.2857673315299043101378.png";
import DeleteLogo from "./img/icon/kisspng-computer-icons-cross-delete-logo-5af9be0a4efa42.9017664415263165543235.png";

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState("");
  const toggleInput = (event) => {
    setInput(event.target.value);
  };
  const copyElement = (coper) => {
    navigator.clipboard.writeText(coper);
    alert("Copié");
  };
  const openHistory = () => {
    if (history === "" || history === null || history === undefined) {
      setHistory("L'historique est vide.");
    } else {
      setHistory("");
      for (let numero = 0; numero < localStorage.length; numero++)
        setHistory((history += localStorage.getItem(`searchy${numero}`)));
    }
  };
  const deleteHistory = () => {
    localStorage.clear();
    setHistory("L'historique a été vidé.");
  };
  const reset = () => {
    setInput("");
    return;
  };
  const getValue = () => {
    var str = input;
    var reg = new RegExp("#[a-z]+", "ig");
    var array = str.match(reg) !== null && str.match(reg).join(" \n");
    var reg2 = new RegExp("@[a-z]+", "ig");
    var array2 = str.match(reg2) !== null && str.match(reg2).join(" \n");
    var outputArea = "";
    if (array && array2) {
      outputArea = array + "\n" + array2 + "\n";
    } else if (array && !array2) {
      outputArea = "Aucun @ trouvé" + "\n" + array + "\n";
    } else if (!array && array2) {
      outputArea = "Aucun # trouvé" + "\n" + array2 + "\n";
    } else if (!array && !array2) {
      outputArea = "Aucune donnée trouvée" + "\n";
    }
    setOutput(outputArea);
    let num = localStorage.length;
    let dater = new Date();
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const day = dater.getDay();
    const date = dater.getDate();
    const month = dater.getMonth();
    const year = dater.getFullYear();
    const hours = dater.getHours();
    const min = dater.getMinutes();
    const sec = dater.getSeconds();
    let datering = `${days[day]} ${date} ${months[month]} ${year} ${hours}:${min}:${sec}`;
    localStorage.setItem(`searchy${num}`, `${datering}\n` + `${outputArea}\n`);
    reset();
    return;
  };
  return (
    <div className="App">
      <header className="option container">
        <img className="img1" src={FinalLogo} alt="Logo" />
        <p className="pSearch">Search in a text</p>
        <button
          onClick={openHistory}
          id="buttonOpenHistory"
          className="buttoner"
        >
          Historique
        </button>
        <button
          onClick={getValue}
          type="button"
          id="getValue"
          className="buttoner"
        >
          <img className="imagering" src={Icon} alt=" " /> Rechercher
        </button>
      </header>

      <div className="container">
        <textarea
          type="text"
          placeholder="Entrer un texte"
          id="input"
          value={input}
          onChange={toggleInput}
        ></textarea>

        <div>
          <textarea
            type="text"
            placeholder="Résultat"
            id="output"
            value={output}
            disabled
          ></textarea>
          <a onClick={() => copyElement(output)} id="copyToClipBoardOutput">
            <img src={ComputerLogo} className="copyButton" alt="copy" />
          </a>
        </div>
      </div>
      <textarea
        className="textArea2"
        type="text"
        id="history"
        value={history}
        placeholder="History"
        disabled
      ></textarea>
      <a onClick={() => copyElement(history)} id="copyToClipBoardHistory">
        <img src={PasterLogo} className="copyButton" alt="copy" />
      </a>
      <a onClick={deleteHistory} id="deleteHistory">
        <img src={DeleteLogo} className="deleteButton" alt="copy" />
      </a>
    </div>
  );
};

export default App;
