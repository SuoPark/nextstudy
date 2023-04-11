import { TextField, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

/**
 * @component
 * @category Component Atoms
 * @subcategory atoms
 * @property {ReactNode} [children] 라벨
 * @example
 * <EssentialComp>{...}</EssentialComp>
 */
const EssentialComp: React.FC<IProps> = function ({ children }) {
  return (
    <>
      <span style={{ color: 'red' }}>*</span> {children}
    </>
  );
};

export default EssentialComp;
