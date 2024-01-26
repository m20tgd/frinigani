import { FC } from 'react';

import './league-table.style.scss';
import { PlayerStatsCollection, PlayerStatsData } from '../../types/player-stats-data.type';
import { values } from 'lodash';
import LeagueTableRow from './league-table-row.component';

interface LeagueTableProps {
    playerStats: PlayerStatsCollection
}

const sortStats =(statsArray: Array<PlayerStatsData>) => {
    statsArray.sort((a,b) => {
        if (a.wins > b.wins) return -1;
        if (a.wins < b.wins) return 1;
        if (a.bestStreak > b.bestStreak) return -1;
        if (a.bestStreak < b.bestStreak) return 1;
        if (a.plays > b.plays) return -1;
        if (a.plays < b.plays) return 1;
        if (a.hosts > b.hosts) return -1;
        if (a.hosts < b.hosts) return 1;
        return 0;
    })
}

const LeagueTable: FC<LeagueTableProps> = ({playerStats}) => {
    const statsArray = values(playerStats);
    sortStats(statsArray);

    return (
        <div className='mt-2'>
            <h1>League Table</h1>
            <table className='table' id='leagueTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Hosted</th>
                        <th>Played</th>
                        <th>Streak</th>
                        <th>Won</th>
                    </tr>
                </thead>
                <tbody>
                    {statsArray.map(stats => <LeagueTableRow key={stats.name} stats={stats} />)}
                </tbody>
            </table>
        </div>
    )

}

export default LeagueTable