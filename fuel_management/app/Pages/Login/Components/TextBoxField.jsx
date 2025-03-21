import { Input } from '@heroui/react';

const TextBoxField = ({
  label = "",
  type = "",
  name = "",
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      <h3 className="text-black font-semibold text-small">{label}</h3>
      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          labelPlacement={'outside'}
          placeholder={placeholder}
          type="email"
          className='w-full  border border-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400'
        />
      </div>
    </div>
  );
}

export default TextBoxField; 
