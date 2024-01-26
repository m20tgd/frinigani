import { useState, useEffect } from 'react'

import GameNightData from '../../types/game-night-data.type';
import { PlayerStatsCollection } from '../../types/player-stats-data.type';

import LeagueTable from '../../components/league-table/league-table.component';
import GameNightTable from '../../components/game-night-table/game-night-table-component';

import calculatePlayerStats from '../../utils/playerStatCalculator.util';

const Initial_Game_Night_State: Array<GameNightData> = [];
const Initial_Player_Stats_State: PlayerStatsCollection = {};

const Homepage = () => {

    const [gameNights, setGameNights] = useState(Initial_Game_Night_State);
    const [playerStats, setPlayerStats] = useState(Initial_Player_Stats_State);

    const getGameNights = async () => {
      try {
        const response = await fetch('/.netlify/functions/firebase_get_game_nights');
        if (response.status !== 200) throw Error(response.statusText);
        const data = await response.json();
        const gameNights = (data.gameNightArray as Array<GameNightData>).map(gameNight => ({...gameNight, date: new Date(gameNight.date)}));
        setGameNights(gameNights);
      }
      catch(error) {
        console.log('Unable to get Game Nights', error);
      }
    }
  
    useEffect(() => {
      getGameNights();
    }, [])
  
    useEffect(() => {
      const playerStats = calculatePlayerStats(gameNights);
      setPlayerStats(playerStats);
    }, [gameNights]);




    return(
        <div className='container'>
          <LeagueTable playerStats={playerStats} />
          <GameNightTable gameNights={gameNights}/>
        </div>
    )
}

export default Homepage;