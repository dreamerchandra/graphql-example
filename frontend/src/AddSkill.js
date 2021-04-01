import React, { useState } from 'react'
import Close from './close-button.png'
export default function AddSkill({ show, onSubmit, onClose, label }): React$Element<any> {
    const [value, setValue] = useState('')
    return (
        <div className="add-skill-wrapper">
            <div className="add-skill card">
                <div className="header">
                    <h1>Add {label} Skill</h1>
                    <img src={Close} onClick={onClose}></img>
                </div>
                <div className="body">
                    <input value={value} disabled={!show} onChange={(event) => setValue(event.target.value)} />
                    <button onClick={() => onSubmit(value)}>Add Skill</button>
                </div>
            </div>
        </div>
    )
}