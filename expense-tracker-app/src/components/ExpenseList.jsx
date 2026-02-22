import React from 'react'

const ExpenseList = ({expneses, deleteExpense}) => {

    if(expneses.length === 0) return <p>No Expenses yet</p>
  return (
    <ul className='list'>
      {
        expneses.map((item) => (
            <li key={item.id} className='item'>
                <span>{item.title}</span>
            </li>
        ))
      }
    </ul>
  )
}

export default ExpenseList
