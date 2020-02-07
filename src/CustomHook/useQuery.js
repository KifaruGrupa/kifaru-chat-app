import { useState, useEffect } from 'react';
const UseFilter = (raw, value, filterBy) => {
  // raw must be a static array
  const [data, setData] = useState(null);
  // filters the content of raw by the filterBy argument
  const filterArr = (filterRaw, filterValue) => {
    const result = filterRaw.filter(content => content[filterBy || 'name'].toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
    return result;
  };
  useEffect(() => {
    if (raw && raw.length) {
      setData(filterArr(raw, value || ''));
    }
  }, [raw, value]);
  return data;
};
export default UseFilter;