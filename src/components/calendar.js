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
     switch (item) {
      case 'Custom Range': 
        this.setState({
          rangeDuration: !this.state.rangeDuration,
          addCustomRange: !this.state.addCustomRange,
        })
      break  
      case 'Live': console.log(getTime())
      break
      case 'Today': console.log('Today')
      break
      case 'Yesterday': console.log('Yesterday')
      break
      case 'This Week': console.log('This Week')
      break
      case 'Last Week': console.log('Last Week')
      break
      case 'Last 30 Days': console.log('Last 30 Days')
      break
      case 'This Month': console.log('This Month')
      break
      case 'Last Month': console.log('Last Month')
      break
      default: 
        console.log('Range error!')                  
    }
  }

  getCustomeDate(from, to) {
    if (from !== null && to !== null) console.log(from, to)
    return
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