import styled from 'styled-components'
import { ThemeHelper } from '../../themes'

const getBorderColor = props => props?.type === 'Strogg' ? ThemeHelper.getEnemyColor(props) : ThemeHelper.getAllyColor(props)

export const TdmDataWrapper = styled.div`
  border-radius: 4px;
  color: white;
  display: flex;
  margin-bottom: 10px;
`

export const HeaderWrapper = styled.div`
`

export const TableWrapper = styled.div`
  background: ${ ThemeHelper.getModalColor };
  border-radius: 4px;
  display: grid;
  grid-template-columns: minmax(120px, 3fr) 1fr 1fr 1fr 1fr;
  margin-right: 10px;
`

export const SeparatorWrapper = styled.div`
  border-bottom: 2px solid ${ getBorderColor };
`

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const EmptyRow = styled.div`
  height: 18px;
  ${ props => props?.serial === 1 && `border-bottom: 2px solid ${ getBorderColor(props) }` };
`

export const RowDataWrapper = styled.div`
  ${ props => props?.serial === 1 && `border-bottom: 2px solid ${ getBorderColor(props) }` };

`