import { EmptyRow, RowDataWrapper } from './styles'
import React from 'react'

export const RowData = ({ item, index, type }) => {
  if (!item || item === 'Weapons') {
    return <EmptyRow serial={ index } type={type}/>
  }

  return <RowDataWrapper serial={ index } type={type} key={ index }>{ item }</RowDataWrapper>
}

