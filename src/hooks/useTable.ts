import { ChangeEvent, useState } from 'react'
import { DropResult, ResponderProvided } from 'react-beautiful-dnd'

interface IProps {
  initialRows?: { [key: string]: any }[]
}

const useTable = function ({ initialRows }: IProps = {}) {
  const [rows, setRows] = useState(initialRows || [])
  const [selected, setSelected] = useState<{ [key: string]: any }[]>([])
  const [droppableId, setDroppableId] = useState<string>('dragTable')

  const handleAllSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked }
    } = event
    setSelected(checked ? rows : [])
  }
  const handleSelect = ({ event, row }: { event: ChangeEvent<HTMLInputElement>; row: { [key: string]: any } }) => {
    const {
      target: { checked }
    } = event
    if (checked) {
      setSelected([...selected, row])
    } else {
      setSelected(selected.filter(item => item !== row))
    }
  }
  const handleRadioSelect = ({ event, row }: { event: ChangeEvent<HTMLInputElement>; row: { [key: string]: any } }) => {
    const {
      target: { checked }
    } = event
    if (checked) {
      setSelected([row])
    } else {
      setSelected([])
    }
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = [...rows]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setRows(items)
  }

  return {
    rows,
    selected,
    setSelected,
    droppableId,
    setDroppableId,
    setRows,
    handleAllSelect,
    handleSelect,
    handleDragEnd,
    handleRadioSelect
  }
}

export default useTable
