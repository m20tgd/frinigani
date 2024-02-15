/// <reference types="vite-plugin-svgr/client" />

import { FC } from 'react';
import { PlayerStatsData } from '../../types/player-stats-data.type';

import { CrownIcon } from './league-table.style';

interface LeagueTableRowProps {
    stats: PlayerStatsData,
    key: string
}

const LeagueTableRow: FC<LeagueTableRowProps> = ({stats}) => {
    const { name, hosts, plays, bestStreak, wins, currentWinner } = stats;

    return(
        <tr>
            <td>{name}</td>
            <td>{hosts}</td>
            <td>{plays}</td>
            <td>{bestStreak}</td>
            <td>{wins} { currentWinner ? <CrownIcon /> : '' }</td>
        </tr>
    )
}

export default LeagueTableRow