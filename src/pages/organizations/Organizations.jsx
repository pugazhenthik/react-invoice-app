import { useState } from 'react';
import axiosClient from '../../axios';
import Loader from '../../components/layouts/Loader';
import notify from '../../nofity';
import PageTitleBar from '../../components/common/PageTitleBar';
import ColumnSort from '../../components/common/table/ColumnSort';
import { EditButton, DeleteButton } from '../../components/common/Buttons';
import useFetch from '../../hooks/useFetch';
const columns = [
  {
    column: 'id',
    title: '#',
  },
  {
    column: 'industries.name',
    title: 'Industry',
  },
  {
    column: 'name',
    title: 'Name',
  },
  {
    column: 'phone',
    title: 'Phone',
  },
  {
    column: 'city',
    title: 'City',
  },
  {
    column: 'street_1',
    title: 'Address',
  },
];
const model = 'organizations';

function Organizations() {
  const [sort, setSort] = useState({ column: 'id', order: 'asc' });

  const url = `${model}?column=${sort.column}&order=${sort.order}`;
  const { data, isLoading, isValidating, mutate } = useFetch(url);

  const onDelete = async (e, id) => {
    e.preventDefault();

    await axiosClient
      .delete(`${model}/${id}`)
      .then(() => {
        notify('deleted')
        mutate(url)
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <PageTitleBar model={model}></PageTitleBar>
      {(isLoading || isValidating) && <Loader />}
      {!(isLoading || isValidating) && (
        <div className="relative rounded-md overflow-auto shadow-lg">
          <table className="w-full table-auto border-collapse text-gray-600">
            <thead className="divide-y">
              <tr className="bg-slate-100 text-left text-sm font-medium text-gray-700">
                {columns.map((c) => (
                  <ColumnSort
                    key={c.column}
                    text={c}
                    sort={sort}
                    setSort={setSort}
                  />
                ))}
                <th className="p-3">Options</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((org, index) => (
                <tr
                  key={org.id}
                  className={
                    'hover:bg-slate-50 text-sm ' +
                    (index % 2 !== 0 ? ' bg-slate-100 ' : ' bg-white')
                  }
                >
                  <td className="p-3 w-32">{org.id}</td>
                  <td className="p-3 w-32 capitalize">{org.industry.name}</td>
                  <td className="p-3 w-52">{org.name}</td>
                  <td className="p-3 w-20">{org.phone}</td>
                  <td className="p-3 w-20">{org.city}</td>
                  <td className="p-3">{org.street_1}</td>
                  <td className="p-3 w-44 flex">
                    <EditButton model={model} resourceId={org.id} />
                    <DeleteButton onDelete={onDelete} resourceId={org.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Organizations;
