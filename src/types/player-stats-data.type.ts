export type PlayerStatsCollection = {
    [key: string] : PlayerStatsData
}

export type PlayerStatsData = {
        "name": string
        "plays": number,
        "wins": number,
        "hosts": number,
        "currentStreak": number,
        "bestStreak": number,
        "currentWinner": boolean
}