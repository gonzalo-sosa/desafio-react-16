const SearchWithFilter = ({ items }) => {
  const options = [{ value: "", label: " " }, ...items]
  
  return (
    <select>
      {options.map((opt, index) => <option key={index} value={opt.value}>{opt.label}</option>)}
    </select>
  )
}

export default SearchWithFilter;