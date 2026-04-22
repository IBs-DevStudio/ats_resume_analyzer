import {type FormEvent, useState, useEffect} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!auth.isAuthenticated && !isLoading) {
            navigate('/auth?next=/upload');
        }
    }, [auth.isAuthenticated, isLoading, navigate]);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="min-h-screen bg-[#f8fbff] flex flex-col font-sans relative overflow-hidden">
            <Navbar />

            {/* Glowing Background Blobs */}
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] pointer-events-none animate-blob"></div>
            <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>

            <section className="flex-1 flex flex-col items-center pt-32 pb-24 px-4 relative z-10">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0f2137] mb-4 tracking-tight">
                        Smart feedback for your <span className="text-[#0b65c2]">dream job</span>
                    </h1>
                    {isProcessing ? (
                        <h2 className="text-xl text-slate-600 font-medium animate-pulse">{statusText}</h2>
                    ) : (
                        <h2 className="text-xl text-slate-500">Drop your resume for an ATS score and improvement tips</h2>
                    )}
                </div>

                {isProcessing ? (
                    <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-12 flex flex-col items-center justify-center">
                        <img src="/images/resume-scan.gif" className="w-64 mb-8 mix-blend-multiply" alt="Scanning resume" />
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                             <div className="bg-[#0b65c2] h-full rounded-full w-1/2 animate-[progress_2s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl bg-white rounded-[20px] shadow-sm border-[1.5px] border-[#e2e8f0] p-8 md:p-12 relative">
                        {/* Decorative Top Accent */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sky-400 to-[#0b65c2] rounded-b-full"></div>

                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="company-name" className="uppercase text-[11px] font-mono font-semibold text-[#64748b] tracking-wider">Company Name</label>
                                    <input 
                                        type="text" 
                                        name="company-name" 
                                        placeholder="e.g. Google" 
                                        id="company-name" 
                                        className="w-full px-4 py-3.5 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white focus:bg-white focus:ring-1 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all placeholder-slate-400 font-medium text-slate-800"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="job-title" className="uppercase text-[11px] font-mono font-semibold text-[#64748b] tracking-wider">Job Title</label>
                                    <input 
                                        type="text" 
                                        name="job-title" 
                                        placeholder="e.g. Product Manager" 
                                        id="job-title" 
                                        className="w-full px-4 py-3.5 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white focus:bg-white focus:ring-1 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all placeholder-slate-400 font-medium text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="job-description" className="uppercase text-[11px] font-mono font-semibold text-[#64748b] tracking-wider flex justify-between">
                                    <span>Job Description</span>
                                    <span className="font-normal opacity-70">Optional</span>
                                </label>
                                <textarea 
                                    rows={6} 
                                    name="job-description" 
                                    placeholder="Paste the target job description here..." 
                                    id="job-description" 
                                    className="w-full px-4 py-3.5 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white focus:bg-white focus:ring-1 focus:ring-[#0ea5e9] focus:border-[#0ea5e9] outline-none transition-all placeholder-slate-400 font-medium text-slate-800 resize-y"
                                />
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <label htmlFor="uploader" className="uppercase text-[11px] font-mono font-semibold text-[#64748b] tracking-wider">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button 
                                type="submit"
                                disabled={!file}
                                className={`relative w-full py-4 rounded-xl font-bold text-lg transition-all mt-4 ${file ? 'bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white hover:opacity-90 shadow-md hover:-translate-y-0.5 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    ⚡ Analyze Resume
                                </span>
                            </button>
                        </form>
                    </div>
                )}
            </section>
            
            <style>{`
                @keyframes progress {
                    0% { width: 0%; transform: translateX(0); }
                    50% { width: 50%; transform: translateX(100%); }
                    100% { width: 0%; transform: translateX(200%); }
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
            `}</style>
        </main>
    )
}

export default Upload