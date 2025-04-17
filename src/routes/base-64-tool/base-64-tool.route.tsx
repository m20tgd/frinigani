import { useEffect, useState } from "react";

import { 
    transformDecimalIntoBase64, 
    transformBase64IntoDecimal, 
    nonBase64RegEx
} from "./base-64-tool.tool";

const Base64Tool = () => {

    const [ decimalInput, setDecimalInput ] = useState(0);
    const [ base64Output, setBase64Output ] = useState('');
    const [ decimalOutput, setDecimalOutput ] = useState(0);
    const [ base64Input, setBase64Input ] = useState('A');

    useEffect(() => {
      document.title = "Base 64 Tool";
    }, []);

    useEffect(() => {
        setBase64Output(transformDecimalIntoBase64(decimalInput))
    }, [decimalInput])

    useEffect(() => {
        setDecimalOutput(transformBase64IntoDecimal(base64Input))
    }, [base64Input])

    const decimalInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDecimalInput(parseInt(event.target.value || "0"))
    }

    const base64InputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBase64Input(event.target.value.replaceAll(nonBase64RegEx, ''))
    }

    return (
        <div className="container">
            <div className="row ">
                <fieldset className="col-xxl-8 offset-xxl-2">
                    <legend>Base 64 Tool</legend> 
                    <div className="input-group mb-3">
                        <span className="col-5 col-sm-4 col-lg-2 col-form-label">Decimal to Base 64</span> 
                        <input onChange={decimalInputHandler} type="number" min={0} className="form-control" value={decimalInput} />
                        <span className="form-control" >{base64Output}</span>
                    </div>
                    <div className="input-group mb-3">
                        <span className="col-5 col-sm-4 col-lg-2 col-form-label">Base 64 toDecimal</span> 
                        <input onChange={base64InputHandler} type="text" className="form-control" value={base64Input} />
                        <span className="form-control" >{decimalOutput}</span>
                    </div>
                </fieldset>
            </div>
        </div>
    )

}

export default Base64Tool;