import '../../styles/FilterBar.css';

const FilterBar = ({ filterType, onFilterChange, onClearStates }) => {
  const filters = [
    { type: 'all', label: 'All' },
    { type: 'unread', label: 'Unread' },
    { type: 'read', label: 'Read' },
    { type: 'favorites', label: 'Favorites' }
  ];

  return (
    <div className="nav-bar">
      <div className="filter-bar">
        <span className="filter-text">Filter by:</span>
        {filters.map((filter) => (
          <button
            key={filter.type}
            className={`filter-button ${filterType === filter.type ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.type)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <button className="clear-states" onClick={onClearStates}>
        Clear Saved States
      </button>
    </div>
  );
};

export default FilterBar;