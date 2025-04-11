const ColoredCard2 = ({color, title, percentage, target, prior}) => {
    return (
        <div className="h-auto w-auto min-w-36 p-2 rounded-3xl grid" style={{ backgroundColor: color }}>
            <div className="font-semibold grid">
                <label className="text-3xl text-right drop-shadow-lg">{percentage}%</label>
                <label className="text-white text-base uppercase underline font-bold">{title}</label>
            </div>

            <div className="grid">
                <label className="text-xs text-gray-500 font-semibold">TARGET: {target}</label>
                <label className="text-xs text-white">SELL IN: {prior}</label>
            </div>
        </div>
    )
}

export default ColoredCard2