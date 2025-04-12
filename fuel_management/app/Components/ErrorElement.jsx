
/**
 * @param {ReactNode} children
 * @returns {JSX.element} 
 */

const ErrorElement = ({ children }) => {

  if(children == null) throw new Error("ErrorElement requires a valid child element")

  return (
    <div className="mx-4 p-4 border border-default-300 bg-danger-50">
      <span className="text-sm font-semibold text-default-600">
        {children}
      </span>
    </div>
  )
}

export default ErrorElement;
