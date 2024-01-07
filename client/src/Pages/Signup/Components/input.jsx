import React from 'react'

function InputS(props) {
    return (
        <div>
            <div className="mb-3">

                <label htmlFor="username" className="form-label" >{props.label}</label>
                <input
                    id={props.id}
                    className={"form-control"} onChange={props.onChange} />
                <div>{props.error && <div>
                    {props.error}</div>}</div>
            </div>
        </div>
    )
}

export default InputS