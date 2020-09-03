import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    return (
        <>
            <p style={{fontSize:"26px", fontWeight:"bold"}}>statistics</p>
            {all > 0 ? (
                <p>
                    good {good}<br/>
                    neutral {neutral}<br/>
                    bad {bad}<br/>
                    all {all} <br/>
                    average {(good + bad*(-1))/all} <br/>
                    positive {(good/all)*100} % <br/>
                </p>
            ) : (
                <p>No feedback given</p>
            )}
        </>
    )
}

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
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

