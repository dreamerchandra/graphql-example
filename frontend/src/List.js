import React, {useState} from 'react'
import AddSkill from './AddSkill';

export default function List({items, onNewItem}){
    const [showModel, setShowModel] = useState(false)
    return (
        <>
            <div onClick={() => {
                setShowModel(true)
            }}>
                {
                    items.map((item) => item.node.name)
                }
                
            </div>
            <AddSkill show={showModel} onSubmit={(newSkill) => {
                setShowModel(false)
                onNewItem(newSkill)
            }}/>
        </>
    )
}