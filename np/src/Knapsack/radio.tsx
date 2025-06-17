import "./radio.css"
export default function Radioalgo(){
    return (
        <div className="container">

        <form className="toggle">

            <input type="radio" id="choice1" name="choice" value="creative"/>
            <label htmlFor="choice1">Exacto</label>

            <input type="radio" id="choice2" name="choice" value="productive"/>
            <label htmlFor="choice2"> Aproximado</label>

            <div id="flap"><span className="content">Algoritmo</span></div>

        </form>

    </div>
    );
}