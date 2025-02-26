import PropTypes from "prop-types";

const TextArea = ({ resultRef, result }) => {
  return (
    <div ref={resultRef} className="py-4 px-2 bg-gray-700 rounded-lg">
      <div className="flex items-center">
        <input
          type="text"
          readOnly
          value={result}
          className="bg-gray-600 text-white rounded-l-lg p-2 w-full"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg">
          Copy
        </button>
      </div>
    </div>
  );
};

export default TextArea;

TextArea.propTypes = {
  resultRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  result: PropTypes.string.isRequired
};
