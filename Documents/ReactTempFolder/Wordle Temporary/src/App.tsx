import { useState, type Key } from "react";
import { useEffect } from "react";
import Line from "./Line.tsx";


const API_URL = "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words";



// wordle app
const App: React.FC = () => {
  
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
        } else {
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
  useEffect(() => {
    const fetchWord = async () => {
      // theres a chance it fails so we use try catch
      try {
        const response: Response = await fetch(API_URL);
        const text: string = await response.text();
        const words: string[] = text.split("\n");
        const chosenWord: string = words[Math.floor(Math.random() * words.length)];
        setWord(chosenWord);
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    }

    fetchWord();
  }, []);



  return (
    <>
      <div className="text-7xl h-screen w-screen flex flex-col gap-4 justify-center items-center bg-black text-white">
      {
        guesses.map((guess, index) => {
          const isCurrentIDX: boolean = guesses.findIndex(g => g === null) === index;
          return(
            <Line key={index}
                  guess={isCurrentIDX ? currentGuess : (guess ? guess : "")}
                  solution={word}
                  isFinalGuess={guess !== null && !isCurrentIDX}
            />
          )
        })

      }

      </div>


      
    </>
  )
}

export default App;
