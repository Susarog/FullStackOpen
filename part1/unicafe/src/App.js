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
const Stats = (props) => {
  const all = props.good + props.bad + props.neutral;
  if (isNaN(all) || all == 0) {
    return <div>No feedback given</div>;
  }

  return (
    <>
    <div>
      good {props.good}
    </div>
    <div>
      neutral {props.neutral}
    </div>
    <div>
      bad {props.bad}
    </div>
    <div>
      all {all}
    </div>
    <div>
      average {(props.good - props.bad) / all}
    </div>
    <div>
      positive {props.good / all * 100}
    </div>
    </  >
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
      <br/>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App