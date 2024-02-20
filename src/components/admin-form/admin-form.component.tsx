import { FC } from "react";

type AdminFormProps = {

}

const AdminForm: FC<AdminFormProps> = () => {

    return (
        <form>
            <div className="form-floating mb-3">
                <input type="date" className="form-control form-control-sm" id="dateInput" placeholder="-" required/>
                <label htmlFor="dateInput">Date</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control form-control-sm" id="gameInput" placeholder="-" required/>
                <label htmlFor="gameInput">Game</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="foodInput" placeholder="-" required/>
                <label htmlFor="foodInput">Food</label>
            </div>

            <fieldset className='mb-3'>
                <legend>Host</legend>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Anthony</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">David</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Esme</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Ethan</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions"/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Tom</label>
                </div>
            </fieldset>

            <fieldset className='mb-3'>
                <legend>Players</legend>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">Anthony</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">David</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Esme</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Ethan</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Tom</label>
                </div>
            </fieldset>

            <fieldset className='mb-3'>
                <legend>Winners</legend>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">Anthony</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">David</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Esme</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Ethan</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Tom</label>
                </div>
            </fieldset>

            <button className="btn btn-secondary" type="submit">Submit</button>

        </form>
    )

}

export default AdminForm;