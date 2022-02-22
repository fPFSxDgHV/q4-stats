import React from 'react'
import { EmptyRow, RowDataWrapper, RowWrapper, TableWrapper } from './styles'
import { RowData } from './RowData'

const mapData = (data) => {
  const result = {
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: []
  }

  data.forEach(q => {
    for (const [key, value] of Object.entries(q)) {
      result[key].push(value)
    }
  })

  return result
}


const Table = ({ columns, data, type }) => {
  const tableData = mapData(data)
  return (
    <TableWrapper>
      <RowWrapper>
        { tableData.col1.map((item, index) => <RowData type={type} item={ item } index={ index }/>) }
      </RowWrapper>
      <RowWrapper>
        { tableData.col2.map((item, index) => <RowData type={type} item={ item } index={ index }/>) }
      </RowWrapper>

      <RowWrapper>
        { tableData.col3.map((item, index) => <RowData type={type} item={ item } index={ index }/>) }
      </RowWrapper>
      <RowWrapper>
        { tableData.col4.map((item, index) => <RowData type={type} item={ item } index={ index }/>) }
      </RowWrapper>
      <RowWrapper>
        { tableData.col5.map((item, index) => <RowData type={type} item={ item } index={ index }/>) }
      </RowWrapper>
    </TableWrapper>
  )
}

export default Table