import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const StatisticLine = ({text, value}) =>
    <tbody>
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    </tbody>

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    return (
        <>
            <p style={{fontSize:"26px", fontWeight:"bold"}}>statistics</p>
            {all > 0 ? (
                <table>
                    <StatisticLine text="good" value={good}/>
                    <StatisticLine text="neutral" value={neutral}/>
                    <StatisticLine text="bad" value={bad}/>
                    <StatisticLine text="all" value={all}/>
                    <StatisticLine text="average" value={((good-bad)/all).toFixed(2)}/>
                    <StatisticLine text="positive" value={Math.round((good/all)*100).toFixed(2) + " %"}/>
                </table>
            ) : (
                <p>No feedback given</p>
            )}
        </>
    )
}

const Button = ({state, setFunction, label}) => {
    const handleClick = (state, setFunction) => () => setFunction(state+1)
    
    return (
        <button onClick={handleClick(state, setFunction)}>{label}</button>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <p style={{fontSize:"26px", fontWeight:"bold"}}>give feedback</p>
            <Button state={good} setFunction={setGood} label="good" />
            <Button state={neutral} setFunction={setNeutral} label="neutral" />
            <Button state={bad} setFunction={setBad} label="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

