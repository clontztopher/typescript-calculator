import * as React from 'react'

const CalcBtn = ({ fn, val, addClass }: any) => {
  return (
    <button
      type="button"
      className={'btn btn-secondary ' + (addClass || '')}
      onClick={fn}
    >
      {val}
    </button>
  )
}

export default ({ cal }) => (
  <div className="card-body">
    <div className="buttons">
      <CalcBtn val="AC" fn={() => cal.clear()} addClass="modifier" />
      <CalcBtn val="+/-" fn={() => cal.negate()} addClass="modifier" />
      <CalcBtn val="%" fn={() => cal.addPercent()} addClass="modifier" />
      <CalcBtn val="/" fn={() => cal.divide()} addClass="bg-warning" />
    </div>
    <div className="buttons">
      <CalcBtn val="7" fn={() => cal.addNumber('7')} />
      <CalcBtn val="8" fn={() => cal.addNumber('8')} />
      <CalcBtn val="9" fn={() => cal.addNumber('9')} />
      <CalcBtn val="x" fn={() => cal.multiply()} addClass="bg-warning" />
    </div>
    <div className="buttons">
      <CalcBtn val="4" fn={() => cal.addNumber('4')} />
      <CalcBtn val="5" fn={() => cal.addNumber('5')} />
      <CalcBtn val="6" fn={() => cal.addNumber('6')} />
      <CalcBtn val="-" fn={() => cal.minus()} addClass="bg-warning" />
    </div>
    <div className="buttons">
      <CalcBtn val="1" fn={() => cal.addNumber('1')} />
      <CalcBtn val="2" fn={() => cal.addNumber('2')} />
      <CalcBtn val="3" fn={() => cal.addNumber('3')} />
      <CalcBtn val="+" fn={() => cal.plus()} addClass="bg-warning" />
    </div>
    <div className="buttons">
      <CalcBtn val="0" fn={() => cal.addNumber('0')} addClass="zero" />
      <CalcBtn val="." fn={() => cal.addDecimal()} />
      <CalcBtn val="=" fn={() => cal.calculate()} addClass="bg-warning" />
    </div>
  </div>
)
