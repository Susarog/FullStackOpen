import { useState } from 'react'


const Header = ({title}) => {
  return (
  <h1>{title}</h1>
)};
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({value, text}) => {
  return (
    <tbody>
      <tr>
        <td>
          {text} 
        </td>
        <td> {value} </td>
      </tr>
    </tbody>
  )
}

const Stats = (props) => {
  const all = props.good + props.bad + props.neutral;
  const positiveVal = (props.good / all * 100).toString() + " %";
  if (isNaN(all) || all == 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={(props.good - props.bad) / all} />
      <StatisticsLine text="positive" value={positiveVal} />
    </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    setGood(good + 1);
  }
  const updateNeutral = () => {
    setNeutral(neutral + 1);
  }
  const updateBad = () => {
    setBad(bad + 1);
  }
  const all = good + neutral + bad;


  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={updateGood} text="good" />
      <Button onClick={updateNeutral} text="neutral" />
      <Button onClick={updateBad} text="bad" />
      <Header title="statistics" />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App