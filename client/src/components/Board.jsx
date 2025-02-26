import PropTypes from "prop-types";

const Board = ({ list }) => {
  return (
    <div className="flex absolute right-10 flex-col text-black bg-gray-300 border dark:border-none items-start text-center space-y-3 dark:bg-gray-600 dark:text-white p-5 rounded-xl">
      <h2 className="text-2xl font-bold">Top 10</h2>
      {list.map((item) => (
        <li key={item.short_url}>{item.original_url}</li>
      ))}
    </div>
  );
};

Board.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      short_url: PropTypes.string.isRequired,
      original_url: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Board;
