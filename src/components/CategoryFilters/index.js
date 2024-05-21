const CategoryFilters = (props) => {
  const { item, activeFilter, activeFilterChanged } = props;

  const { name } = item;

  const tabChanged = () => {
    activeFilterChanged(item);
  };

  return (
    <li
      onClick={tabChanged}
      className={`tab ${
        activeFilter !== null &&
        activeFilter.uniqueId === item.uniqueId &&
        "active-tab"
      }`}
    >
      {name}
    </li>
  );
};

export default CategoryFilters;
