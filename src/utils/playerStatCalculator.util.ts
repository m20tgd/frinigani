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
    gameNights.forEach(({winners, host, players}, index, array) => {
        const numberOfGameNights = array.length;
        players.forEach(player => {
            const stats = playerStats[player];
            //Increment number of games played by player
            stats.plays++;
            // Check if player is a winner
            if (isPlayerAWinner(player, winners)){
                // Increment wins and current streak if they are
                stats.wins++;
                stats.currentStreak++;
                // Update best streak if it is beaten
                if (stats.currentStreak > stats.bestStreak) stats.bestStreak  = stats.currentStreak;
                //If this is the most recent game night, mark the winner(s) as current winner(s)
                if (index+1 === numberOfGameNights) stats.currentWinner = true;
            }
            else {
                // Reset streak if they are not a winner
                stats.currentStreak = 0;
            }
            // If player is the host, increment number of times they've hosted
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
        bestStreak: 0,
        currentWinner: false
    }
}

const isPlayerAWinner = (player: string, winners: Array<string>): boolean => {
    return winners.includes(player);
}

const isPlayerTheHost = (player: string, host: string): boolean => {
    return player === host;
}

export default calculatePlayerStats;