import { useEffect, useState } from "react"
import FileInput from "~/Components/FileInput"
import ProgressBar from "~/Components/ProgressBar"
import { useUploadDailySalesXml } from "~/Hooks/Sales/useUploadDailySalesXml"

const UploadPOS = () => {
    const [file, setFile] = useState(null)
    
    useEffect(()=> {
        const submitHandler = async () => {
            if (file!==null) {
                const data = new FormData()
                data.append("pos", file)
        
                const res = await useUploadDailySalesXml(data)
                if (res=="Success") setFile(null)
                console.log(res)
            }
        }

        submitHandler()
    }, [file])


    return (
        <div className="w-96">
            <FileInput 
                label={"Upload POS file"}
                acceptedType={"XML"}
                maxSize={"25Mb"}
                file={file}
                setFile={setFile}
            />
            <ProgressBar />
        </div>
    )
}

export default UploadPOS