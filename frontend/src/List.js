import React, { useState } from 'react'
import AddSkill from './AddSkill';

export default function List({ items, onNewItem, label }): React$Element<any> {
    const [showModel, setShowModel] = useState(false)
    return (
        <>
            <div className="card" onClick={() => {
                setShowModel(true)
            }}>
                {
                    items.map((item) => <p key={item.node.id}>{item.node.name}</p>)
                }

            </div>
            {showModel && <AddSkill
                onClose={() => setShowModel(false)}
                show={showModel}
                label={label}
                onSubmit={(newSkill) => {
                    setShowModel(false)
                    onNewItem(newSkill)
                }} />}
        </>
    )
}