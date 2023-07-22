import { useState } from 'react';
import axiosClient from '../../axios';
import Loader from '../../components/layouts/Loader';
import notify from '../../nofity';
import ColumnSort from '../../components/common/table/ColumnSort';
import PageTitleBar from '../../components/common/PageTitleBar';
import { DeleteButton, EditButton } from '../../components/common/Buttons';
import useFetch from '../../hooks/useFetch';

const model = 'items';
const columns = [
  { column: 'id', title: '#' },
  { column: 'type', title: 'Type' },
  { column: 'name', title: 'name' },
  { column: 'price', title: 'Price' },
  { column: 'sku', title: 'SKU' },
  { column: 'description', title: 'Description', noSort: true },
];

function Items() {
  const [sort, setSort] = useState({ column: 'id', order: 'asc' });

  const url = `${model}?column=${sort.column}&order=${sort.order}`;
  const { data, isLoading, isValidating, mutate } = useFetch(url);

  const onDelete = async (e, id) => {
    e.preventDefault();

    await axiosClient
      .delete(`/${model}/${id}`)
      .then(() => {
        mutate(url)
        notify('deleted')
      })
      .catch((err) => {
        console.log(err.message)
        notify('deleted', 'danger')
      });
  };

  return (
    <>
      <PageTitleBar model={model} />
      {(isLoading || isValidating) && <Loader />}
      {!(isLoading || isValidating) && (
        <div className="relative rounded-md overflow-scroll-x mb-10 shadow-lg">
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
              {data?.data.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    'hover:bg-slate-50 text-sm ' +
                    (index % 2 !== 0 ? ' bg-slate-100 ' : ' bg-white')
                  }
                >
                  <td className="p-3 w-16">{item.id}</td>
                  <td className="p-3 w-32 capitalize">{item.type}</td>
                  <td className="p-3 w-52 capitalize">{item.name}</td>
                  <td className="p-3 w-32">{item.price}</td>
                  <td className="p-3 w-32">{item.sku}</td>
                  <td className="p-3 w-60">{item.description}</td>
                  <td className="p-3 w-44 flex">
                    <EditButton model={model} resourceId={item.id} />
                    <DeleteButton onDelete={onDelete} resourceId={item.id} />
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

export default Items;
