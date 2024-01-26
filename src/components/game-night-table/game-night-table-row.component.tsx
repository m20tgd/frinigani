import { FC } from 'react';

import GameNightData from '../../types/game-night-data.type';
import { getMonthAndYearString } from '../../utils/date-manipulation.util';

interface GameNightTableRowProps {
    gameNight: GameNightData,
    key: number
}

const GameNightTableRow: FC<GameNightTableRowProps> = ({gameNight}) => {
    const { date, game, food, host, players, winners } = gameNight;

    return(
        <tr>
            <td>{getMonthAndYearString(date)}</td>
            <td>{game}</td>
            <td>{food}</td>
            <td>{host}</td>
            <td>{players.join(', ')}</td>
            <td>{winners.join(', ')}</td>
        </tr>
    )
}

export default GameNightTableRow