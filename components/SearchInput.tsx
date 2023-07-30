'use client';

import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import useDebounce from '@/hooks/useDebounce';

import Input from './Input';

interface SearchInputProps {
  baseUrl: string;
  placeholder?: string;
}

const SearchInput = ({ baseUrl, placeholder }: SearchInputProps) => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: baseUrl || '/',
      query,
    });

    router.push(url);
  }, [debouncedValue, router, baseUrl]);

  return <Input placeholder={placeholder || 'What do you want to listen to?'} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export default SearchInput;
