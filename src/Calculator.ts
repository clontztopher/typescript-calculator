import Big from 'big.js'

// Operations containing the keys of Big Js methods
enum Op {
  plus = 'plus',
  minus = 'minus',
  times = 'times',
  div = 'div',
  decimal = 'decimal'
}

export interface CalcState {
  readonly right: string
  readonly left: string | null
  readonly operation: Op | null
  readonly warning: boolean
}

export const initCalcState: CalcState = {
  right: '0',
  left: null,
  operation: null,
  warning: false
}

interface Calculator {
  state: CalcState
  watchers: Array<Function>
}

class Calculator {
  constructor() {
    this.state = initCalcState
    this.watchers = []
  }
  private updateState(mergeObject: object) {
    const newState = Object.assign({}, this.state, mergeObject)
    this.state = newState
    if (this.watchers.length > 0) {
      this.watchers.forEach(watcher => watcher(newState))
    }
  }
  public addWatcher(fn: Function, runImmediately?: boolean) {
    this.watchers = this.watchers.concat(fn)
    if (runImmediately) {
      let state = this.state
      fn(state)
    }
  }
  public clear() {
    this.updateState(initCalcState)
  }
  public addNumber(val: string) {
    let { right } = this.state
    let newRight = right && right !== '0' ? right + val : val
    this.updateState({ right: newRight })
  }
  public addDecimal() {
    let { right } = this.state
    if (!right.includes('.')) {
      this.updateState({ right: right + '.' })
    }
  }
  private addOperator(op: Op) {
    let { right, left, operation } = this.state
    if (left !== null && right !== null) {
      this.calculate()
      this.updateState({ operation: op })
    } else if (right !== null && operation === null) {
      this.updateState({
        right: null,
        left: right,
        operation: op
      })
    } else if (left && !right) {
      this.updateState({ operation: op })
    }
  }
  public plus() {
    this.addOperator(Op.plus)
  }
  public minus() {
    this.addOperator(Op.minus)
  }
  public divide() {
    this.addOperator(Op.div)
  }
  public multiply() {
    this.addOperator(Op.times)
  }

  public addPercent() {
    if (this.state.right) {
      let right = this.state.right
      this.updateState({
        right: Big(right)
          .times(0.1)
          .toString()
      })
    }
  }
  public negate() {
    if (this.state.right) {
      let { right } = this.state
      this.updateState({
        right: Big(right)
          .times(-1)
          .toString()
      })
    }
  }
  public calculate() {
    let { right, left, operation } = this.state
    let answer
    try {
      answer = Big(left as string)
        [operation as Op](right)
        .toString()
    } catch (e) {
      answer = '0'
      this.triggerWarning()
    }
    this.updateState({
      left: answer,
      right: null,
      operation: null
    })
  }
  triggerWarning() {
    let updateState = this.updateState.bind(this)
    this.updateState({ warning: true })
    setTimeout(function() {
      updateState({ warning: false })
    }, 3000)
  }
}

export default Calculator
