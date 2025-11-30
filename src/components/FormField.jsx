import "./FormField.css";

function FormField({ 
  label, 
  id, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "",
  required = false,
  error = "",
  textarea = false,
  rows = 4
}) {
  const InputComponent = textarea ? "textarea" : "input";
  
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={id} className={required ? "required" : ""}>
          {label}
        </label>
      )}
      <InputComponent
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={textarea ? rows : undefined}
        className={error ? "error" : ""}
      />
      {error && <span className="form-field-error">{error}</span>}
    </div>
  );
}

export default FormField;

