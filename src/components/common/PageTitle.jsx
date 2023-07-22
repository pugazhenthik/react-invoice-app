function PageTitle({ model, title, id }) {
  return (
    <div className="flex mb-6 justify-between">
      <h1 className="text-2xl text-gray-700 capitalize">
        {id ? 'Edit' : 'Add'} {title ? title : model}
      </h1>
    </div>
  );
}

export default PageTitle;
