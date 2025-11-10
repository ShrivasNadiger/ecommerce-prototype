const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => {
    return (
        <div className="flex items-center space-x-3">
            <button
                onClick={onDecrement}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition"
                aria-label="Decrease quantity"
            >
                −
            </button>
            <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
            <button
                onClick={onIncrement}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded transition"
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;

