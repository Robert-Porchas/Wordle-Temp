import { useState, type Key } from "react";
import { useEffect } from "react";


const API_URL = "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";



// wordle app
function App() {
  
  const [word, setWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // handles the key part of the game
  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => {
      if (isGameOver) return;

      if(e.key !== "Enter" && e.key !== "Backspace" && currentGuess.length >= 5) {
        return;
      } // limit guess to 5 characters

      if(e.key === "Enter"){
        if(currentGuess.length !== 5) { return; }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex(g => g === null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        if(currentGuess === word) {
          setIsGameOver(true);
          return;
        }
      }
      setCurrentGuess(oldGuess => {
        if(e.key === "Backspace") {
          return oldGuess.slice(0, -1);
        }
        return oldGuess + e.key;
      })

    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [currentGuess]);


  //fetches a random word from the API also a useEffect hook
  





  return (
    <>
      


      
    </>
  )
}

export default App;
