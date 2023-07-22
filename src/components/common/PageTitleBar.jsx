import { AddButton } from './Buttons';

function PageTitleBar({ model, title = '' }) {
  return (
    <div className="flex mb-6 justify-between">
      <h2 className="text-2xl text-gray-700 capitalize">
        {title ? title : model}
      </h2>
      <div>
        <AddButton model={model}></AddButton>
      </div>
    </div>
  );
}

export default PageTitleBar;
