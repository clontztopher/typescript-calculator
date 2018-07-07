import * as React from 'react'
import { render } from 'react-dom'
import Calculator from './Calculator'
import Buttons from './Buttons'

import './main.css'

const calculator = new Calculator()

const warning = (
  <div className="alert alert-info">
    <strong>Invalid Operation</strong>
  </div>
)

const CalcComponent = ({ cal }: any) => (
  <div className="calculator card">
    <h2 className="card-header">{cal.state.right || cal.state.left}</h2>
    {cal.state.warning ? warning : ''}
    <Buttons cal={cal} />
  </div>
)

const root = document.getElementById('root')
calculator.addWatcher((state: any) => {
  render(<CalcComponent cal={calculator} />, root)
}, true)

// For console testing
//window.calculator = calculator
