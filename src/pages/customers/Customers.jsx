import { useState } from 'react';
import axiosClient from '../../axios';
import Loader from '../../components/layouts/Loader';
import notify from '../../nofity';
import ColumnSort from '../../components/common/table/ColumnSort';
import PageTitleBar from '../../components/common/PageTitleBar';
import { DeleteButton, EditButton } from '../../components/common/Buttons';
import useFetch from '../../hooks/useFetch';

const model = 'customers';
const columns = [
  { column: 'id', title: '#' },
  { column: 'type', title: 'Type' },
  { column: 'display_name', title: 'Name' },
  { column: 'email', title: 'Email' },
  { column: 'description', title: 'Description', noSort: true },
];

function Customers() {
  const [sort, setSort] = useState({ column: 'id', order: 'asc' });

  const url = `${model}?column=${sort.column}&order=${sort.order}`;
  const { data, isLoading, isValidating, mutate } = useFetch(url);

  const onDelete = async (e, id) => {
    e.preventDefault();

    axiosClient
      .delete(`/${model}/${id}`)
      .then(() => {
        mutate(url)
        notify('deleted')
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <PageTitleBar model={model} />

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
                <th width="200" className="p-3">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={
                    'hover:bg-slate-50 text-sm ' +
                    (index % 2 !== 0 ? ' bg-slate-100 ' : ' bg-white')
                  }
                >
                  <td className="p-3 w-20">{customer.id}</td>
                  <td className="p-3 w-32 capitalize">{customer.type}</td>
                  <td className="p-3 w-52">{customer.display_name}</td>
                  <td className="p-3 w-52">{customer.email}</td>
                  <td className="p-3">{customer.mobile}</td>
                  <td className="p-3 w-44 flex">
                    <EditButton model={model} resourceId={customer.id} />
                    <DeleteButton
                      onDelete={onDelete}
                      resourceId={customer.id}
                    />
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

export default Customers;
