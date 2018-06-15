import React, { Component } from 'react'
import 'react-day-picker/lib/style.css'
import './calendar.css'
import Range from './Range'
import DatePicker from './DatePicker'
import getTime from './time'


export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.handleRange = this.handleRange.bind(this) 
    this.addRange = this.addRange.bind(this)
  }
  getInitialState() {
    return {
      rangeDuration: false,
      addCustomRange: false,
    }
  }

  handleRange() {
    this.setState({
      rangeDuration: !this.state.rangeDuration,
    })
  }
  
  addRange(item) {
    const live = new Date()

    const weekDay = live.getDay()
    const Year = live.getFullYear()
    const Month = live.getMonth()
    const Day = live.getDate()
    const Hour = live.getHours()
    const Minutes = live.getMinutes()
    const Seconds = live.getSeconds()


    const todayStart = new Date(Year, Month, Day)
    const todayEnd = new Date(Year, Month, Day, 23, 59, 59)
    const yesterdayStart = new Date(Year, Month, Day-1)
    const yesterdayEnd = new Date(Year, Month, Day-1, 23, 59, 59)
    const thisWeekStart = new Date(Year, Month, Day-(weekDay-1))
    const thisWeekEnd = new Date(Year, Month, Day+(7-weekDay), 23, 59, 59)
    const lastWeekStart = new Date(Year, Month, Day-(weekDay+6))
    const lastWeekEnd = new Date(Year, Month, Day-weekDay, 23, 59, 59)
    const last30DaysStart = new Date(Year, Month, Day-30)
    const last30DaysEnd = new Date(Year, Month, Day, 23, 59, 59)
    const thisMonthStart = new Date(Year, Month)
    const thisMonthEnd = new Date(Year, Month+1, 0, 23, 59, 59)
    const lastMonthStart = new Date(Year, Month-1)
    const lastMonthEnd = new Date(Year, Month, 0, 23, 59, 59)

     switch (item) {
      case 'Custom Range': 
        this.setState({
          rangeDuration: !this.state.rangeDuration,
          addCustomRange: !this.state.addCustomRange,
        })
      break  
      case 'Live': console.log(live)
      break
      case 'Today': console.log(todayStart, todayEnd)
      break
      case 'Yesterday': console.log(yesterdayStart, yesterdayEnd)
      break
      case 'This Week': console.log(thisWeekStart, thisWeekEnd)
      break
      case 'Last Week': console.log(lastWeekStart, lastWeekEnd)
      break
      case 'Last 30 Days': console.log(last30DaysStart, last30DaysEnd)
      break
      case 'This Month': console.log(thisMonthStart, thisMonthEnd)
      break
      case 'Last Month': console.log(lastMonthStart, lastMonthEnd)
      break
      default: 
        console.log('Range error!')                  
    }
  }

  getCustomeDate(from, to) {
    if (from !== null && to !== null) console.log(from, to)
    return
  }

  componentWillMount(){
    console.log(getTime()) // default time loader
  }

  render() {
    const {rangeDuration, addCustomRange} = this.state
    return (
      <div className="container">
        <button 
          className="selectDuration" 
          onClick={this.handleRange}>
          Select Duration
        </button>
        {
         rangeDuration && !addCustomRange ? <div className="rangeContainer"><Range onTodoClick={this.addRange}/></div> :
         !rangeDuration && addCustomRange ? <DatePicker onTodoClick={this.addRange} onSelectDate={this.getCustomeDate}/> :
         null
        }
    </div>
    )
  }
}