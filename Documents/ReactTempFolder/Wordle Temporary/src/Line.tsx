import React from "react";

const WORD_LENGTH = 5;

interface LineProps {
    guess: string, 
    solution: string, 
    isFinalGuess: boolean,
}

const Line: React.FC<LineProps> = ({ guess, solution, isFinalGuess }) => {

    const tiles = [];
    for(let i = 0; i < WORD_LENGTH; i++) {
        const char: string = guess[i];
        const solutionChar: string = solution[i];
        let color: string = "";

        if(isFinalGuess){
            if(char === solutionChar) {
                color = "green";
            } else if (solution.includes(char)) {
                color = "yellow";
            } else {
                color = "gray";
            }
        }

        tiles.push(
            <div
                key={i}
                className="w-[100px] h-[100px] border-2 border-solid flex flex-row justify-center items-center uppercase text-5xl font-bold rounded-[6px]"
                style={color ? { backgroundColor: color, color: color === 'yellow' ? '#000' : '#fff' } : undefined}
            >
                {char}
            </div>
        );
    }
    return (
        <div className="line flex flex-row gap-2">
            {tiles}
        </div>
    );
}

export default Line;