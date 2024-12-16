const SearchPerCategory = ({ items, onSelectOption }) => {
  const options = [{ value: '', label: ' ' }, ...items];

  return (
    <form className="search__filter">
      <select onChange={(e) => onSelectOption(e.target.value)}>
        {options.map((opt, index) => (
          <option key={index} value={opt.value} >
            {opt.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchPerCategory;
