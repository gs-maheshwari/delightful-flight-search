'use client'

import { useFormStatus } from 'react-dom';
import Button, { ButtonProps } from './Button';

const SearchButton = ({ className = '', ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className} {...props}>{pending ? 'Searching...' : 'Search Flights'}</Button>
  )
}

export default SearchButton