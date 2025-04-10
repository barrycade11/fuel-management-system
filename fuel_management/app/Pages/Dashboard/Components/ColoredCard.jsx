const ColoredCard = ({color, title, total, percentage, target, prior}) => {
    return (
        <div className="h-auto w-auto min-w-40 p-2 rounded-3xl flex flex-col justify-between" style={{ backgroundColor: color }}>
            <div className="flex justify-between text-white font-semibold">
                <label className="text-sm uppercase">{title}</label>
                <label className="text-xl">{percentage}%</label>
            </div>

            <div>
                <div className="text-slate-800 text-3xl">
                    <p className="w-full text-center mt-4 font-semibold drop-shadow-lg">{total}</p>
                </div>
                <div className="grid">
                    <label className="text-sm text-white font-semibold">TARGET: {target}</label>
                    <label className="text-xs text-gray-400">TARGET PRIOR: {prior}</label>
                </div>
            </div>
        </div>
    )
}

export default ColoredCard