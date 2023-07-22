import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function ColumnSort({ text, sort, setSort }) {
  const sortBy = (column) => {
    let order = sort.order === 'asc' ? 'desc' : 'asc';
    setSort((sort) => ({ ...sort, order, column }));
  };

  if (text.noSort) {
    return <th className="p-3">{text.title}</th>;
  }
  return (
    <th className="p-3">
      <Link className="flex items-center" onClick={() => sortBy(text.column)}>
        <span className="pr-2">{text.title}</span>
        {sort.order === 'desc' && sort.column === text.column && (
          <ChevronDownIcon className="w-4 h-4" />
        )}
        {sort.order === 'asc' && sort.column === text.column && (
          <ChevronUpIcon className="w-4 h-4" />
        )}
      </Link>
    </th>
  );
}

export default ColumnSort;
