import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <p style={{fontSize:"26px", fontWeight:"bold"}}>give feedback</p>
            <button type="button" onClick={() => setGood(good+1)}>good</button>
            <button type="button" onClick={() => setNeutral(neutral+1)}>neutral</button>
            <button type="button" onClick={() => setBad(bad+1)}>bad</button><br/>
            <p style={{fontSize:"26px", fontWeight:"bold"}}>statistics</p>
            <p>
                good {good}<br/>
                neutral {neutral}<br/>
                bad {bad}<br/>
            </p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

