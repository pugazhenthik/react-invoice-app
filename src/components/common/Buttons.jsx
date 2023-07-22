import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const baseClass = 'px-3 py-1.5 ml-4 rounded text-white ';

export function AddButton({ model }) {
  return (
    <Link
      to={`/${model}/add`}
      className="px-2 py-1 items-center flex rounded ml-2 bg-blue-600 text-white text-sm hover:bg-blue-700"
    >
      <PlusIcon className="w-4 h-4" strokeOpacity={2}></PlusIcon>
      <span className="pl-1">Add</span>
    </Link>
  );
}

export function EditButton({ model, resourceId }) {
  return (
    <Link
      to={`/${model}/edit/${resourceId}`}
      className="px-1 py-1 items-center flex rounded ml-2 bg-blue-600 text-white text-sm hover:bg-blue-700"
    >
      <PencilSquareIcon className="h-4 w-4"></PencilSquareIcon>
      <span className="px-1">Edit</span>
    </Link>
  );
}

export function DeleteButton({ onDelete, resourceId }) {
  return (
    <button
      type="button"
      onClick={(e) => onDelete(e, resourceId)}
      className="px-1 py-1 items-center flex rounded ml-2 bg-red-600 text-white text-sm hover:bg-red-700"
    >
      <TrashIcon className="h-4 w-4"></TrashIcon>
      <span className="px-1">Delete</span>
    </button>
  );
}

export function SubmitButton({ text, type }) {
  return (
    <button
      type={type ? type : 'submit'}
      className={baseClass + 'bg-blue-600 hover:bg-blue-700'}
    >
      {text ? text : 'Save'}
    </button>
  );
}

export function CancelButton({ text, to }) {
  return (
    <Link to={`/${to}`} className={baseClass + 'bg-gray-500 hover:bg-gray-700'}>
      {text ? text : 'Cancel'}
    </Link>
  );
}
