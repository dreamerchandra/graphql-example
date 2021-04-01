import React, { useState } from 'react'

export default function AddSkill({ show, onSubmit }): React$Element<any> {
    const [value, setValue] = useState('')
    return (
        <div className="add-skill-wrapper">
            <div className="add-skill">
                <h1>Add Skill</h1>
                <input value={value} disabled={!show} onChange={(event) => setValue(event.target.value)} />
                <button onClick={() => onSubmit(value)}>Add Skill</button>
            </div>
        </div>
    )
}