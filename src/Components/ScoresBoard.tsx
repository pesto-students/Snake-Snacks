import React from 'react';
import { IScores } from './interfaces';

export default function ScoresBoard(props: {
    scores: Array<IScores>;
}): JSX.Element {
    const { scores } = props;
    return (
        <div className="absolute right-10">
            <h3>Scores</h3>
            <ul>
                {scores.map((sc: IScores) => {
                    return (
                        <li key={sc.name + sc.score}>
                            <span>{sc.name}</span>: <span>{sc.score}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
