import { IOptions } from '@/types/common';
import { useEffect, useRef } from 'react';

interface IProps {
  defaultOptions?: IOptions[];
  defaultValue?: string;
  validator?: (value: string) => boolean;
}

/**
 * @category Custom Hooks
 * @description usePrevious custom hooks
 * @property {any} [value] 이전데이터 비교값 리턴
 * @example
 * // useRadio 예제
 * const prevPaging: any = usePrevious({
 *   page: paging.props.page,
 *   rowsPerPage: paging.props.rowsPerPage,
 * });
 */
const usePrevious = function (value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
