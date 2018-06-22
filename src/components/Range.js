import React from 'react';
import './calendar.css'

const Range = ({onTodoClick, handleRange}) => {
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
        {range.map((item, idx) => 
          <li 
            key={idx} 
            data-range-key={`${item}`} 
            className={handleRange === item ? 'active' : null } 
            onClick={()=>onTodoClick(item)}>{`${item}`}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Range
