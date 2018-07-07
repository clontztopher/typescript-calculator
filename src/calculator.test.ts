import Calculator, { CalcState, initCalcState } from './Calculator'

const calculator = new Calculator()
var state: CalcState
const updateState = (newState: CalcState) => (state = newState)
calculator.addWatcher(updateState)

beforeEach(() => {
  calculator.clear()
})

it('should update current number', () => {
  calculator.addNumber('3')
  expect(state.right).toEqual('3')
})

it('should update correctly again', () => {
  calculator.addNumber('3')
  calculator.addNumber('4')
  expect(state.right).toEqual('34')
})

it('clears state', () => {
  calculator.clear()
  expect(state).toEqual(initCalcState)
})

it('adds a decimal to the current value', () => {
  calculator.addNumber('5')
  calculator.addDecimal()
  calculator.addNumber('7')
  expect(state.right).toEqual('5.7')
})

it('creates a percentage of 10%', () => {
  calculator.addNumber('4')
  calculator.addPercent()
  expect(state.right).toEqual('0.4')
})

it('negates current value', () => {
  calculator.addNumber('5')
  calculator.negate()
  expect(state.right).toEqual('-5')
  calculator.negate()
  expect(state.right).toEqual('5')
})

it('adds operators', () => {
  calculator.plus()
  expect(state.operation).toEqual('plus')
  calculator.minus()
  expect(state.operation).toEqual('minus')
  calculator.multiply()
  expect(state.operation).toEqual('times')
  calculator.divide()
  expect(state.operation).toEqual('div')
})

it('adds two numbers explicitly', () => {
  calculator.addNumber('3')
  calculator.plus()
  calculator.addNumber('4')
  calculator.calculate()
  expect(state.left).toEqual('7')
})

it('adds two numbers by adding a third number', () => {
  calculator.addNumber('7')
  calculator.plus()
  calculator.addNumber('3')
  calculator.plus()
  expect(state.left).toEqual('10')
})
