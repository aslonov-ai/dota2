import "./StyleWerp.css"
import axios from "axios"

function Heros() {

    

    return (
        <div className="">
            <div className="scene">
                <div className="card divine">
                    <div className="lava-trim"></div>
                    <div className="particles-outside"></div>

                    <div className="rarity">DIVINE</div>

                    <div className="header">
                        <span className="title">ASILBEK</span>
                    </div>

                    <div className="art">
                        <div className="lava-trim"></div>

                    </div>

                    <section className="stats">
                        <div><span className="label">HP</span><span className="value">66</span></div>
                        <div><span className="label">ARMOR</span><span className="value">22</span></div>
                        <div>
                            <span className="label">COST</span><span className="value energy">2⚡</span>
                        </div>
                    </section>

                    <section className="abilities">
                        <div className="ability passive">
                            <span className="ability-title">PASSIVE — BLOOD FUEL</span>
                            <span className="ability-text">Heal 2 HP whenever an enemy bleeds.</span>
                        </div>
                        <div className="ability active">
                            <span className="ability-title">ACTIVE — OVERDRIVE</span>
                            <span className="ability-text"
                            >Enter RAGE MODE. +4 Damage for 2 turns.</span>
                        </div>
                    </section>

                    <div className="footnote">
                        <div className="footnote-bg"></div>
                        “MANKIND IS DEAD. BLOOD IS FUEL. HELL IS FULL.”
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heros