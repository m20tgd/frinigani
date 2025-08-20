import { FC, FormEvent, useState } from "react";
import $ from "jquery";
import GameNightData from "../../types/game-night-data.type";
import { useNavigate } from "react-router-dom";

type AdminFormProps = {}

const GroupMembers = [
    "Anthony",
    "David",
    "Esme",
    "Ethan",
    "Tom"
]

const AdminForm: FC<AdminFormProps> = () => {

    const [ players, setPlayers ] = useState<Array<string>>(GroupMembers);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        $('#submitButton').prop('disabled', true);
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
        navigate('/');
    }

    const onAddGuestButtonClick = () => {
        const newGuestName = $('#guestInput').val() as string;
        if (newGuestName) {
            setPlayers([...players, newGuestName + ' (g)']);
            $('#guestInput').val('');
        } 
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

            <div className="input-group input-group-sm mb-3 w-25">
                <input type="text" className="form-control" placeholder="Guest Name" id="guestInput"/>
                <button className="btn btn-secondary" type="button" id="button-addon2" onClick={onAddGuestButtonClick}>Add Guest</button>
            </div>

            <fieldset className='mb-3' id="hostInput">
                <legend>Host</legend>
                { players.map((player, index) => (
                    <div className="form-check form-check-inline" key={index}>
                        <input className="form-check-input" type="radio" name="host" value={player} id={`host-${index}`}/>
                        <label className="form-check-label" htmlFor={`host-${index}`}>{player}</label>
                    </div>
                ))}
            </fieldset>

            <fieldset className='mb-3' id="playersInput">
                <legend>Players</legend>
                { players.map((player, index) => (
                <div className="form-check form-check-inline" key={index}>
                    <input className="form-check-input" type="checkbox" id={`player-${index}`} value={player}/>
                    <label className="form-check-label" htmlFor={`player-${index}`}>{player}</label>
                </div>
                ))}
            </fieldset>

            <fieldset className='mb-3' id="winnersInput">
                <legend>Winners</legend>
                { players.map((player, index) => (
                <div className="form-check form-check-inline" key={index}>
                    <input className="form-check-input" type="checkbox" id={`inlineCheckbox${index}`} value={player}/>
                    <label className="form-check-label" htmlFor={`inlineCheckbox${index}`}>{player}</label>
                </div>
                ))}
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id={`winner-${players.length}`} value="The Game"/>
                    <label className="form-check-label" htmlFor={`winner-${players.length}`}>The Game</label>
                </div>
            </fieldset>

            <button className="btn btn-secondary" type="submit">Submit</button>

        </form>
    )

}

export default AdminForm;