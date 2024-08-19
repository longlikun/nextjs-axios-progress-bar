import React from 'react'

interface ProgressProps {
    progress: number

}
const ProgressBar: React.FC<ProgressProps> = ({
    progress

}) => {
    return (
        <div className="mx-5 my-10 h-4 rounded-full bg-gray-200 ">

            <div className="h-4 rounded-full bg-green-500 w-1/2" style={{ width: `${progress}%` }} ></div>

            <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-gray-600">下载进度</div>
                <div className="text-gray-600">{progress}%</div>
            </div>
        </div>
    )
}

export default ProgressBar