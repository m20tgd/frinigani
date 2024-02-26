import { FC, FormEvent } from "react";
import $ from "jquery";
import GameNightData from "../../types/game-night-data.type";

// type GameNightDataObject = {
//     date: string,
//     game: string,
//     food: string,
//     host: string,
//     players: Array<string>,
//     winners: Array<string>
// }

type AdminFormProps = {

}

const AdminForm: FC<AdminFormProps> = () => {

    console.log('RENDER')

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log(inputValues);
        const date = new Date($('#dateInput').val() as string);
        const game = $('#gameInput').val() as string;
        const food = $('#foodInput').val() as string;
        const host = $('#hostInput :checked').val() as string;
        const players = $('#playersInput :checked')
            .map((_, checkbox) => $(checkbox).val())
            .toArray() as Array<string>;
        const winners = $('#winnersInput :checked')
            .map((_, checkbox) => $(checkbox).val())
            .toArray() as Array<string>;
        const dataToSend: GameNightData = { date, game, food, host, players, winners};
        console.log(dataToSend);
        await fetch('/.netlify/functions/firebase_add_game_night', {
            method: 'POST',
            body: JSON.stringify(dataToSend)
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input type="date" className="form-control form-control-sm" id="dateInput" required/>
                <label htmlFor="dateInput">Date</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control form-control-sm" id="gameInput" required/>
                <label htmlFor="gameInput">Game</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="foodInput" required/>
                <label htmlFor="foodInput">Food</label>
            </div>

            <fieldset className='mb-3' id="hostInput">
                <legend>Host</legend>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="host" value="Anthony"/>
                    <label className="form-check-label">Anthony</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="host" value="David"/>
                    <label className="form-check-label">David</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="host" value="Esme"/>
                    <label className="form-check-label">Esme</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="host" value="Ethan"/>
                    <label className="form-check-label">Ethan</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="host" value="Tom"/>
                    <label className="form-check-label">Tom</label>
                </div>
            </fieldset>

            <fieldset className='mb-3' id="playersInput">
                <legend>Players</legend>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Anthony"/>
                    <label className="form-check-label">Anthony</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="David"/>
                    <label className="form-check-label">David</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Esme"/>
                    <label className="form-check-label">Esme</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Ethan"/>
                    <label className="form-check-label">Ethan</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Tom"/>
                    <label className="form-check-label">Tom</label>
                </div>
            </fieldset>

            <fieldset className='mb-3' id="winnersInput">
                <legend>Winners</legend>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Anthony"/>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">Anthony</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="David"/>
                    <label className="form-check-label" htmlFor="inlineCheckbox2">David</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Esme"/>
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Esme</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Ethan"/>
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Ethan</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="Tom"/>
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Tom</label>
                </div>
            </fieldset>

            <button className="btn btn-secondary" type="submit">Submit</button>

        </form>
    )

}

export default AdminForm;