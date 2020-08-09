import React from "react"

export default function PokeList({poke}) {
    return (
        <div>
            <ul className="poke-container">
                {poke.map(char => {
                    return (
                        <li key={char}>{char}</li>
                    )
                })}
            </ul>
        </div>
    )
}