import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import Range from './Range'
import './calendar.css'
import 'react-day-picker/lib/style.css'

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.state = this.getInitialState()
  }
  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
      
    }
  }
  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
    const isRangeSelected = from && to
    return !from || isBeforeFirstDay || isRangeSelected
  }
  handleDayClick(day) {
    const { from, to } = this.state
    if (from && to && day >= from && day <= to) {
      this.handleResetClick()
      return
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      })
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      })
    }
  }
  handleDayMouseEnter(day) {
    const { from, to } = this.state
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      })
    }
  }
  handleResetClick() {
    this.setState(this.getInitialState())
  }

  render() {
    const { from, to, enteredTo} = this.state
    let decorateFrom
    let decorateTo
    const today  = new Date()
    const modifiers = { start: from, end: enteredTo }
    const disabledDays = { before: this.state.from }
    const selectedDays = [from, { from, to: enteredTo }]

    // changing date format
    if(from !== null) {
      decorateFrom = from.toLocaleDateString().split('.').join('/')
    }
    else decorateFrom = today.toLocaleDateString().split('.').join('/')
    
    if(to !== null) {
      decorateTo = to.toLocaleDateString().split('.').join('/')
    }
    else decorateTo = today.toLocaleDateString().split('.').join('/')
    // end changing date format

    this.props.onSelectDate(from, to)  

    return (
        <div className="dateContainer">
        <Range 
          onTodoClick={this.props.onTodoClick}
          handleRange={this.props.handleRange}
        />
        <div className="CalendarWrapper">
          <div className="DateRangeContainer">
            <input 
              type="text" 
              className="inputDate" 
              value={`${decorateFrom}`}
              readOnly
            />
            <input 
              type="text" 
              className="inputDate" 
              value={`${decorateTo}`}
              readOnly
            />
          </div>
          <DayPicker
            className="Range"
            numberOfMonths={2}
            fromMonth={from}
            selectedDays={selectedDays}
            disabledDays={disabledDays}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
          />
        </div>
      </div>
    )
  }
}