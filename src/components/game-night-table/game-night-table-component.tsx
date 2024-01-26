import { FC } from 'react';

import './game-night-table.style.scss'; 

import GameNightData from '../../types/game-night-data.type';
import GameNightTableRow from './game-night-table-row.component';
import { reverse } from 'lodash';

interface GameNightTableProps {
    gameNights: Array<GameNightData>
}

const GameNightTable: FC<GameNightTableProps> = ({gameNights}) => {

    const reversedGameNights = reverse([...gameNights]);

    return (
        <div className='mt-4'>
            <h1>Game Night History</h1>
            <table className='table' id='gameNightTable'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Game</th>
                        <th>Food</th>
                        <th>Host</th>
                        <th>Players</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {reversedGameNights.map(gameNight => <GameNightTableRow key={gameNight.date.getTime()} gameNight={gameNight} />)}
                </tbody>
            </table>
        </div>
    )

}

export default GameNightTable