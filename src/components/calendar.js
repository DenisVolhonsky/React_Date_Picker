import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import './calendar.css'

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      from: null, //was null
      to: null, //was null
      enteredTo: null, // Keep track of the last day for mouseEnter. //was null
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
    const { from, to, enteredTo } = this.state

    // changing date format
    let englishFrom
    let englishTo
    const today  = new Date()

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

    const modifiers = { start: from, end: enteredTo }
    const disabledDays = { before: this.state.from }
    const selectedDays = [from, { from, to: enteredTo }]
    return (
      <div className="dateContainer">
        <div className="ranges">
          <ul>
            <li data-range-key="Live" className="active">Live</li>
            <li data-range-key="Today">Today</li>
            <li data-range-key="Yesterday">Yesterday</li>
            <li data-range-key="This Week">This Week</li>
            <li data-range-key="Last Week">Last Week</li>
            <li data-range-key="Last 30 Days">Last 30 Days</li>
            <li data-range-key="This Month">This Month</li>
            <li data-range-key="Last Month">Last Month</li>
            <li data-range-key="Custom Range" className="">Custom Range</li>
          </ul>
        </div>
        <div className="CalendarWrapper">
          <div className="DateRangeContainer">
            <input 
            type="text" 
            className="inputDate" 
            value={`${englishFrom}`}
            />
            <input type="text" 
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