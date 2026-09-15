const Button = ({children, className='', ...props}) => {
  return (
    <button 
      className={`inline-flex items-center justify-center font-medium transition-colors focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
