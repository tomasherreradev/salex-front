import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type DropDownTypes = {
  label: string,
  options: string[];
}

export const Dropdown = ({ label, options }: DropDownTypes) => {
  return (
    <div className="relative w-full">
      <select className="border border-gray-300 rounded-lg py-2 px-4 appearance-none w-full">
        <option>{label} 
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
        <ExpandMoreIcon sx={{color: '#d1d5db'}}/>
      </div>
    </div>
  );
};
