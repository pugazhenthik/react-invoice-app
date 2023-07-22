import { useEffect, useState } from 'react';

function Alert({ showAlert }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showAlert);

    let alertTimer = setTimeout(() => setShow(false), 5000);
    return () => {
      clearInterval(alertTimer);
    };
  }, [showAlert]);

  return (
    <>
      {show && (
        <div className="flex absolute right-10  top-2 z-20 w-1/2 bg-red-200 text-red-800 border justify-between border-red-300 px-4 py-2 rounded-md mb-2">
          <span>Record deleted successfully!</span>
          <button type="button" onClick={() => setShow(false)}>
            X
          </button>
        </div>
      )}
    </>
  );
}

export default Alert;
