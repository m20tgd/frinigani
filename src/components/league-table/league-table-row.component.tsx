import { FC } from 'react';
import { PlayerStatsData } from '../../types/player-stats-data.type';

interface LeagueTableRowProps {
    stats: PlayerStatsData,
    key: string
}

const LeagueTableRow: FC<LeagueTableRowProps> = ({stats}) => {
    const { name, hosts, plays, bestStreak, wins } = stats;

    return(
        <tr>
            <td>{name}</td>
            <td>{hosts}</td>
            <td>{plays}</td>
            <td>{bestStreak}</td>
            <td>{wins}</td>
        </tr>
    )
}

export default LeagueTableRow