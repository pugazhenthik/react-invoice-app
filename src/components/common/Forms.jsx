import { CancelButton, SubmitButton } from './Buttons';

export function FormWrapper({ onSubmit, children, width }) {
  return (
    <form onSubmit={onSubmit}>
      <div
        className={'shadow-lg px-6 py-6 rounded bg-white grid gap-y-6 ' + width}
      >
        {children}
      </div>
    </form>
  );
}

export function FormCols({ cols, children }) {
  return (
    <div className={'grid gap-x-6 gap-y-4 md:grid-cols-' + cols}>
      {children}
    </div>
  );
}

export function FormFooter({ to }) {
  return (
    <div className="mt-6 text-right">
      <CancelButton to={to} />
      <SubmitButton />
    </div>
  );
}
