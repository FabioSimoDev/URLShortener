import PropTypes from "prop-types";

export function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <div className="flex items-center gap-3">
      <span>☀️</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={onToggle}
          className="sr-only"
        />
        <div className="w-11 h-6 bg-gray-400 rounded-full transition-all">
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white border rounded-full transition-all ${
              darkMode ? "translate-x-5" : "translate-x-1"
            }`}
          ></div>
        </div>
      </label>
      <span>🌙</span>
    </div>
  );
}

DarkModeToggle.propTypes = {
  darkMode: PropTypes.bool,
  onToggle: PropTypes.func
};
