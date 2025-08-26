import { ChangeEvent, FC, useState } from 'react';
import LeagueTable from '../league-table/league-table.component';
import GameNightData from '../../types/game-night-data.type';
import calculatePlayerStats, { getActiveYears } from '../../utils/playerStatCalculator.util';
import { LeagueTableContainerDiv } from './league-table-container.style';
import { first, reverse } from 'lodash';
import { useNavigate } from 'react-router-dom';


interface LeagueTableContainerProps {
    gameNights: Array<GameNightData>
}

const LeagueTableContainer: FC<LeagueTableContainerProps> = ({gameNights}) => {

    const activeYears = reverse(getActiveYears(gameNights));
    const [ yearFilter, setYearFilter ] = useState<string>(String(first(activeYears) ?? 'all'))
    const allTimePlayerStats = calculatePlayerStats(gameNights, yearFilter);

    const selectChange = (event: ChangeEvent<HTMLSelectElement>) => setYearFilter(String(event.target.value));

    const navigate = useNavigate();

    return (
        <LeagueTableContainerDiv className='mt-2'>
            <div className='d-flex align-items-center'>
                <h1 onClick={() => navigate('/broadband')}>
                    League Table
                </h1>
                <select 
                    className='form-select form-select-sm w-25 ms-3'
                    onChange={selectChange}
                    defaultValue={activeYears.length > 0 ? String(first(activeYears)) : 'all'}
                >
                    <option value="all">All Time</option>
                    { 
                        activeYears.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))
                    }
                </select>
            </div>
            <LeagueTable playerStats={allTimePlayerStats} />
        </LeagueTableContainerDiv>
    )

}

export default LeagueTableContainer