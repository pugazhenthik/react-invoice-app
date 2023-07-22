const inputClass =
  'px-3 py-1.5 text-slate-700 border ring-slate-300 bg-white rounded-md w-full focus:ring-slate-400 focus:outline-blue-500';
export function Label({ htmlFor, label }) {
  return (
    <label className="block mb-2 text-slate-900 capitalize" htmlFor={htmlFor}>
      {label ? label : htmlFor}
    </label>
  );
}

export function Input({ type, name, id, required, placeholder, register }) {
  return (
    <>
      <input
        type={type ? type : 'text'}
        id={id ? id : name}
        name={name}
        {...register(name, { required: required ? required : false })}
        className={inputClass}
        placeholder={placeholder}
      />
    </>
  );
}

export function Select({
  name,
  id,
  options,
  required,
  label,
  register,
  onChange,
}) {
  return (
    <select
      name={name}
      {...register(name, { required: required ? required : false })}
      onChange={onChange}
      id={id ? id : name}
      className={inputClass}
    >
      <option value="" key={0}>Select {label ? label : name}</option>
      {options &&
        options.map((option) => (
          <option className="capitalize" key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
    </select>
  );
}

export function Error({ errors, name }) {
  return (
    errors?.[name] && (
      <span className="text-red-400 text-sm">This field is required</span>
    )
  );
}

export function InputColumn({
  type,
  name,
  label,
  required,
  placeholder,
  register,
  errors,
  id,
}) {
  return (
    <div>
      <Label htmlFor={id ? id : name} label={label} />
      <Input
        id={id ? id : name}
        type={type}
        name={name}
        register={register}
        required={required}
        placeholder={placeholder}
      />
      <Error errors={errors} name={name} />
    </div>
  );
}

export function TextareaColumn({
  name,
  required,
  label,
  placeholder,
  register,
  errors,
  id,
}) {
  return (
    <div>
      <Label htmlFor={id ? id : name} label={label} />
      <textarea
        id={id ? id : name}
        name={name}
        {...register(name, { required: required ? required : false })}
        className={inputClass}
        placeholder={placeholder}
        rows="2"
      />
      <Error errors={errors} name={name} />
    </div>
  );
}

export function SelectColumn({
  name,
  options,
  required,
  label,
  register,
  errors,
  onChange,
  id,
}) {
  return (
    <div>
      <Label htmlFor={id ? id : name} label={label} />
      <Select
        id={id ? id : name}
        name={name}
        required={required}
        options={options}
        register={register}
        onChange={onChange}
        label={label}
      />
      <Error errors={errors} name={name} />
    </div>
  );
}
