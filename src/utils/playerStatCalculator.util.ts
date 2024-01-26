import GameNightData from "../types/game-night-data.type";
import { PlayerStatsCollection, PlayerStatsData } from "../types/player-stats-data.type";

import { uniq } from 'lodash';

const calculatePlayerStats = (gameNights: Array<GameNightData>): PlayerStatsCollection => {
    //---Create Stats Object for Each Player
    const playerStats: PlayerStatsCollection = {};
    const players = getAllPlayers(gameNights);
    players.forEach(player => playerStats[player] =generatePlayerStatsObject(player));
    console.log(playerStats)
    //---Iterate through Game Nights and update stats
    gameNights.forEach(({winners, host, players}) => {
        players.forEach(player => {
            const stats = playerStats[player];
            stats.plays++;
            if (isPlayerAWinner(player, winners)){
                stats.wins++;
                stats.currentStreak++;
                if (stats.currentStreak > stats.bestStreak) stats.bestStreak  = stats.currentStreak;
            }
            else {
                stats.currentStreak = 0;
            }
            if (isPlayerTheHost(player, host)) stats.hosts++
        })
    })
    return playerStats;
}

const getAllPlayers = (gameNights: Array<GameNightData>): Array<string> => {
    const allPlayers: Array<string> = gameNights.map(gameNight => gameNight.players).flat();
    return uniq(allPlayers);
}

const generatePlayerStatsObject = (name: string): PlayerStatsData => {
    return {
        name,
        plays: 0,
        wins: 0,
        hosts: 0,
        currentStreak: 0,
        bestStreak: 0
    }
}

const isPlayerAWinner = (player: string, winners: Array<string>): boolean => {
    return winners.includes(player);
}

const isPlayerTheHost = (player: string, host: string): boolean => {
    return player === host;
}

export default calculatePlayerStats;