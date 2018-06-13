import React from 'react';
import './calendar.css'

const Range = ({onTodoClick}) => {
  const range = [
    "Live",
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range"
  ]
  return (
    <div className="ranges">
      <ul>
        {range.map((item, idx) => idx === 0 ? <li key={idx} data-range-key={`${item}`} className="active" onClick={()=>onTodoClick(item)}>{`${item}`}</li>
        :
        <li key={idx} data-range-key={`${item}`} onClick={()=>onTodoClick(item)}>{`${item}`}</li>
        )}
      </ul>
    </div>
  )
}

export default Range