import "./Button.css";

function Button({ 
  children, 
  variant = "primary", 
  type = "button",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false
}) {
  const buttonClass = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

