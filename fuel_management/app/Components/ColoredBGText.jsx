const ColorBGText = ({ color, text }) => {
    return (
        <div className="px-2 py-1 rounded-lg w-min text-white" style={{ backgroundColor: color }}>
            {text}          
        </div>
    )
};

export default ColorBGText;