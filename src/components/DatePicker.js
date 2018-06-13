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
      rangeDuration: false,
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
    let englishFrom
    let englishTo
    const today  = new Date()
    const modifiers = { start: from, end: enteredTo }
    const disabledDays = { before: this.state.from }
    const selectedDays = [from, { from, to: enteredTo }]

    // changing date format
    if(from !== null) {
      let arrFrom = from.toLocaleDateString().split('.')
      englishFrom = [arrFrom[1], arrFrom[0], arrFrom[2]].join('/')
    }
    else englishFrom = today.toLocaleDateString("en-US")
    
    if(to !== null) {
      let arrTo = to.toLocaleDateString().split('.')
      englishTo = [arrTo[1], arrTo[0], arrTo[2]].join('/')
    }
    else englishTo = today.toLocaleDateString("en-US")
    // end changing date format

    return (
        <div className="dateContainer">
        <Range />
        <div className="CalendarWrapper">
          <div className="DateRangeContainer">
            <input 
              type="text" 
              className="inputDate" 
              value={`${englishFrom}`}
            />
            <input 
              type="text" 
              className="inputDate" 
              value={`${englishTo}`}
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