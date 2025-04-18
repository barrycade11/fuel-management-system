/**
 * Represents a file input.
 * @constructor
 * @param {string} label - The label on the top of the input.
 * @param {string} acceptedType - File type of the input.
 * @param {string} maxSize - Maximum size of the input in Mb.
 * @param {file} file - The actual file.
 * @param {function} setFile - React hook to update file state.
 */

const FileInput = ({label, acceptedType, maxSize, file, setFile}) => {

    const handleFileUpload = (e) => {
        let inputFile = e.target.files[0];
        let fileSize = inputFile.size;
    
        if (fileSize > maxSize * 1000000) {
            return alert(`File size too large, please select a file that is lower than ${maxSize}Mb`)
        } else {
            setFile(inputFile)
        }

        // if (fileType==="text/xml") {
        //     setFile(inputFile)
        // }
    }

    return (
        <div>
            <label className="font-semibold text-lg">{label}</label>
            <div className="flex items-center justify-center w-full my-4">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{acceptedType} (MAX. {maxSize})</p>
                    </div>
                    <input onChange={handleFileUpload} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
        </div>
    )
}

export default FileInput