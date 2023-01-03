import { useState } from 'react'

const Statistics = (prop) => {
  // +1 0 -1
  
  const bad = prop.bad
  const good = prop.good
  const neutral = prop.neutral
  const all = bad+good+neutral
  const avg = ((bad*-1) + (good)+ (neutral*0)) / (bad+good+neutral)
  const pos = good / (bad+good+neutral)
  
  if( bad === 0 & good === 0 & neutral===0 ){
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
        <StatisticLine text='good' value ={good} />
        <StatisticLine text='neutral' value ={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={pos}  />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  if (props.text === 'positive'){
    return(
      <>
      <tr>
        <td>
          {props.text} {props.value} %
        </td>
      </tr>
    </>
    )
  }

  return (
    <>
      <tr>
        <td>
          {props.text} {props.value}
        </td>
      </tr>
    </>
  )
}
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good+1)
  const increaseBadOne = () => setBad(bad+1)
  const increaseNeutralOne = () => setNeutral(neutral+1)
  return (
    <div>
      <h1>Give Feedback</h1>

      <Button onClick={increaseGoodByOne} text='good'/>
      <Button onClick={increaseNeutralOne} text='neutral'/>
      <Button onClick={increaseBadOne} text='bad'/>

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App