import React, { useState } from 'react'
import AddSkill from './AddSkill';

export default function List({ items, onNewItem }) {
    const [showModel, setShowModel] = useState(false)
    return (
        <>
            <div className="card" onClick={() => {
                setShowModel(true)
            }}>
                {
                    items.map((item) => <p>{item.node.name}</p>)
                }

            </div>
            {showModel && <AddSkill show={showModel} onSubmit={(newSkill) => {
                setShowModel(false)
                onNewItem(newSkill)
            }} />}
        </>
    )
}