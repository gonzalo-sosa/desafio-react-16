const SearchWithFilter = ({ items }) => {
  const options = [{ value: '', label: ' ' }, ...items];

  return (
    <form className="search--filter">
      <select>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchWithFilter;
