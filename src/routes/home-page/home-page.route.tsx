import { useState, useEffect } from 'react'

import GameNightData from '../../types/game-night-data.type';

import GameNightTable from '../../components/game-night-table/game-night-table-component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

import LeagueTableContainer from '../../components/league-table-container/league-table-container.component.';

const Initial_Game_Night_State: Array<GameNightData> = [];

const Homepage = () => {

    const [gameNights, setGameNights] = useState(Initial_Game_Night_State);
    const [isLoading, setIsLoading] = useState(true);

    const getGameNights = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/.netlify/functions/firebase_get_game_nights');
        if (response.status !== 200) throw Error(response.statusText);
        console.log('Response', response)
        const data = await response.json();
        console.log('DATA', data);
        const gameNights = (data.gameNightArray as Array<GameNightData>).map(gameNight => ({...gameNight, date: new Date(gameNight.date)}));
        setGameNights(gameNights);
        setIsLoading(false);
      }
      catch(error) {
        console.log('Unable to get Game Nights', error);
      }
    }
  
    useEffect(() => {
      getGameNights();
    }, [])

    return(
        <>
          {
            isLoading ?
            <LoadingSpinner /> :
            <div className='container'>
              <LeagueTableContainer gameNights={gameNights} />
              <GameNightTable gameNights={gameNights}/>
            </div>
          }
        </>
    )
}

export default Homepage;