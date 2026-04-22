import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className={`w-full border-[1.5px] rounded-[16px] transition-all ${isDragActive ? 'border-[#0ea5e9] bg-[#e0f2fe]' : 'border-[#0ea5e9] bg-[#f0f9ff] hover:bg-[#e0f2fe]'}`}>
            <div {...getRootProps()} className="p-8 text-center outline-none cursor-pointer flex flex-col items-center justify-center min-h-[200px]">
                <input {...getInputProps()} />

                {file ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 shadow-sm border border-green-200">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-800">
                                {file.name}
                            </p>
                            <p className="text-[11px] font-mono text-slate-500 mt-1 uppercase">
                                {formatSize(file.size)}
                            </p>
                        </div>
                        <button className="mt-2 text-[11px] font-mono font-bold text-red-500 hover:text-red-700 hover:underline uppercase tracking-wide px-3 py-1 bg-red-50 rounded-md" onClick={(e) => {
                            e.stopPropagation();
                            onFileSelect?.(null);
                        }}>
                            Remove File
                        </button>
                    </div>
                ): (
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-[#0ea5e9] mb-2">
                            <svg className="w-10 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h6" />
                            </svg>
                        </div>
                        <p className="text-[14px] font-semibold text-[#0f2137]">
                            Drop your PDF here or <span className="text-[#0ea5e9]">click to browse</span>
                        </p>
                        <p className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider mt-1">PDF only · Max 10MB</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default FileUploader