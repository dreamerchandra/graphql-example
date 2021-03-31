import React, {useState} from 'react'

export default function AddSkill ({show, onSubmit}){
    const [value, setValue] = useState('')
    return (
        <>
        <input value={value} disabled={!show} onChange={(event) => setValue(event.target.value)}/>
        <button onClick={() => onSubmit(value)}>Add Skill</button>
        </>
    )
}