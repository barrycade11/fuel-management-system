const ProgressBar = () => {
    return (
        <div className="w-full grid gap-1">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <g id="Folder Open ">
                            <path id="icon" d="M5 28.3333V14.8271C5 10.2811 5 8.00803 6.36977 6.56177C6.43202 6.49604 6.49604 6.43202 6.56177 6.36977C8.00803 5 10.2811 5 14.8271 5H15.3287C16.5197 5 17.1151 5 17.6492 5.18666C17.9753 5.30065 18.2818 5.46465 18.5575 5.67278C19.0091 6.0136 19.3394 6.50907 20 7.5C20.6606 8.49093 20.9909 8.9864 21.4425 9.32722C21.7182 9.53535 22.0247 9.69935 22.3508 9.81334C22.8849 10 23.4803 10 24.6713 10H28.3333C31.476 10 33.0474 10 34.0237 10.9763C35 11.9526 35 13.524 35 16.6667V17.5M16.2709 35H25.8093C28.2565 35 29.4801 35 30.3757 34.3164C31.2714 33.6328 31.5942 32.4526 32.2398 30.0921L32.6956 28.4254C33.7538 24.5564 34.2829 22.622 33.2823 21.311C32.2817 20 30.2762 20 26.2651 20H16.7339C14.2961 20 13.0773 20 12.1832 20.6796C11.2891 21.3591 10.9629 22.5336 10.3105 24.8824L9.84749 26.549C8.76999 30.428 8.23125 32.3675 9.23171 33.6838C10.2322 35 12.2451 35 16.2709 35Z" stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
                        </g>
                    </svg>
                    <div className="grid gap-1">
                        <h4 className="text-gray-900 text-sm font-normal leading-snug">General Documents.txt</h4>
                        <h5 className="text-gray-400   text-xs font-normal leading-4">23 seconds remaining</h5>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g id="Upload 3">
                        <path id="icon" d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#D1D5DB" stroke-width="1.6" stroke-linecap="round" />
                    </g>
                </svg>
            </div>
            <div className="relative flex items-center gap-2.5 py-1.5">
                <div className="relative  w-full h-2.5  overflow-hidden rounded-3xl bg-gray-100">
                    <div role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="80" style={{width: "80%"}} className="flex h-full items-center justify-center bg-indigo-600  text-white rounded-3xl"></div>
                </div>
                <span className="ml-2 bg-white  rounded-full  text-gray-800 text-xs font-medium flex justify-center items-center ">80%</span>
            </div>
        </div>
    )
}

export default ProgressBar