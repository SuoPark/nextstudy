import { TablePaginationProps } from '@mui/material'
import { MouseEvent, useState } from 'react'

interface IProps {
  defaultPage?: number
  defaultRowsPerPage?: number
  defaultCount?: number
  defaultRowsPerPageOptions?: number[]
}

export interface IPagination {
  props: {
    page: number
    rowsPerPage: number
    count: number
    rowsPerPageOptions: number[]
    onPageChange: any
    onRowsPerPageChange: any
  }
  setPage: any
  setRowsPerPage: any
  setCount: any
  setRowsPerPageOptions: any
}

/**
 * @typedef IPropsUseTablePagination
 * @property {number} [defaultPage=0] 시작페이지
 * @property {number} [defaultRowsPerPage=10] row 갯수
 * @property {number} [defaultCount=0] 전체갯수
 * @property {Array<number>} [defaultRowsPerPageOptions=[10, 25, 100]] row 갯수 옵션
 *
 */

/**
 * @category Custom Hooks
 * @description 페이지네이션 custom hooks
 * @param {IPropsUseTablePagination} props
 * @returns {number} props.page - 페이지 넘버
 * @returns {number} props.rowsPerPage - rows 넘버
 * @returns {number} props.count - 전체갯수
 * @returns {Array<number>} props.rowsPerPageOptions - row 갯수 옵션
 * @returns {Function} props.onPageChange - 페이지 변환 콜백
 * @returns {Function} props.onRowsPerPageChange - row 옵션 변환 콜백
 * @returns {Function} setPage - page setState
 * @returns {Function} setRowsPerPage - setRowsPerPage setState
 * @returns {Function} setCount - setCount setState
 * @returns {Function} setRowsPerPageOptions - setRowsPerPageOptions setState
 * @example
 * // usePagination 예제
 * const paging = usePagination();
 *
 * return (
 *  <TableComp pagination={paging}>
 *    {...}
 *  </TableComp>
 * )
 */
const usePagination = function ({
  defaultPage,
  defaultRowsPerPage,
  defaultCount,
  defaultRowsPerPageOptions
}: IProps = {}) {
  const [page, setPage] = useState(defaultPage || 0)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 10)
  const [count, setCount] = useState(defaultCount || 0)
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState(defaultRowsPerPageOptions || [10, 25, 100])

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(newPage, 'handleChangePage')
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value }
    } = event

    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return {
    props: {
      page,
      rowsPerPage,
      count,
      rowsPerPageOptions,
      onPageChange: handleChangePage,
      onRowsPerPageChange: handleChangeRowsPerPage
    },
    setPage,
    setRowsPerPage,
    setCount,
    setRowsPerPageOptions
  }
}

export default usePagination
