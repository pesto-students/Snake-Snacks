import React from 'react';

export default function GameOVer(props: {
    isGameOver: boolean;
    score: number;
    name: string;
}): JSX.Element | null {
    const { isGameOver, score, name } = props;
    if (!isGameOver) {
        return null;
    }

    return (
        <div className="absolute">
            <div className="flex flex-col w-screen h-screen justify-center items-center bg-black bg-opacity-80 text-white">
                <div>Game Over, {name}</div>
                <div>
                    Your Score: <span>{score}</span>
                </div>
            </div>
        </div>
    );
}
