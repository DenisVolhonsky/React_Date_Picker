import React, { Component } from 'react'
import 'react-day-picker/lib/style.css'
import './calendar.css'
import Range from './Range'
import DatePicker from './DatePicker'
import {unix} from './TimeDecorator'


export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.handleRange = this.handleRange.bind(this) 
    this.addRange = this.addRange.bind(this)
    this.obj={
      startDate:1,
      endDate:2
    }
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
    const endTime = [23, 59, 59]

    const now = Math.floor(Date.now()/1000)
    const todayStart = new Date(Year, Month, Day)
    const todayEnd = new Date(Year, Month, Day, ...endTime)
    const yesterdayStart = new Date(Year, Month, Day-1)
    const yesterdayEnd = new Date(Year, Month, Day-1, ...endTime)
    const thisWeekStart = new Date(Year, Month, Day-(weekDay-1))
    const thisWeekEnd = new Date(Year, Month, Day+(7-weekDay), ...endTime)
    const lastWeekStart = new Date(Year, Month, Day-(weekDay+6))
    const lastWeekEnd = new Date(Year, Month, Day-weekDay, ...endTime)
    const last30DaysStart = new Date(Year, Month, Day-30)
    const last30DaysEnd = new Date(Year, Month, Day, ...endTime)
    const thisMonthStart = new Date(Year, Month)
    const thisMonthEnd = new Date(Year, Month+1, 0, ...endTime)
    const lastMonthStart = new Date(Year, Month-1)
    const lastMonthEnd = new Date(Year, Month, 0, ...endTime)
  
     switch (item) {
      case 'Custom Range': 
        this.setState({
          rangeDuration: !this.state.rangeDuration,
          addCustomRange: !this.state.addCustomRange,
        })
      break  
      case 'Live': console.log('Live -', now)
      break
      case 'Today': console.log('Today - ', unix(todayStart), unix(todayEnd))
      break
      case 'Yesterday': console.log('Yesterday - ', unix(yesterdayStart), unix(yesterdayEnd))
      break
      case 'This Week': console.log('This Week - ', unix(thisWeekStart), unix(thisWeekEnd))
      break
      case 'Last Week': console.log('Last Week - ', unix(lastWeekStart), unix(lastWeekEnd))
      break
      case 'Last 30 Days': console.log('Last 30 Days - ', unix(last30DaysStart), unix(last30DaysEnd))
      break
      case 'This Month': console.log('This Month - ', unix(thisMonthStart), unix(thisMonthEnd))
      break
      case 'Last Month': console.log('Last Month - ', unix(lastMonthStart), unix(lastMonthEnd))
      break
      default: 
        console.log('Range error!')                  
    }
  }

  getCustomeDate(from, to) { 
    if (from !== null && to !== null) {
      let dayFrom = unix(from)-(12*60*60)
      let dayTo = unix(to)+((12*60*60)-1)
      console.log('Custom Range - ', dayFrom, dayTo)}
    return
  }

  componentWillMount() {
    const now = Math.floor(Date.now()/1000)
    console.log('Live -', now) // default time loader
  }

  render() {
    const {rangeDuration, addCustomRange} = this.state
    const defaultRange = rangeDuration && !addCustomRange
    const customRange = !rangeDuration && addCustomRange
    return (
      <div className="container">
        <button 
          className="selectDuration" 
          onClick={this.handleRange}>
          Select Duration
        </button>
        {
          defaultRange
          ? <div className="rangeContainer"><Range onTodoClick={this.addRange}/></div>
          : customRange && <DatePicker onTodoClick={this.addRange} onSelectDate={this.getCustomeDate}/>
        }
    </div>
    )
  }
}