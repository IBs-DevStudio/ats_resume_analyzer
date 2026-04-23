import {type FormEvent, useState, useEffect} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const steps = [
    { key: 'upload', label: 'Uploading resume', desc: 'Securely transferring your PDF' },
    { key: 'convert', label: 'Converting to image', desc: 'Rendering resume preview' },
    { key: 'image', label: 'Uploading preview', desc: 'Storing resume snapshot' },
    { key: 'prepare', label: 'Preparing analysis', desc: 'Structuring job context' },
    { key: 'analyze', label: 'AI analyzing resume', desc: 'Claude is reviewing your resume' },
];

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [currentStep, setCurrentStep] = useState(-1);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!auth.isAuthenticated && !isLoading) {
            navigate('/auth?next=/upload');
        }
    }, [auth.isAuthenticated, isLoading, navigate]);

    const handleFileSelect = (file: File | null) => setFile(file);

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: {
        companyName: string, jobTitle: string, jobDescription: string, file: File
    }) => {
        setIsProcessing(true);

        // ✅ userId scoping
        const userId = auth.user?.uuid;
        if (!userId) return setStatusText('Error: Not authenticated');

        setCurrentStep(0); setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText('Error: Failed to upload file');

        setCurrentStep(1); setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setCurrentStep(2); setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error: Failed to upload image');

        setCurrentStep(3); setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        };
        // ✅ scoped key
        await kv.set(`resume:${userId}:${uuid}`, JSON.stringify(data));

        setCurrentStep(4); setStatusText('Analyzing...');
        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        );
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${userId}:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        navigate(`/resume/${uuid}`);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;
        if (!file) return;
        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    };

    return (
        <main className="min-h-screen bg-[#f8fbff] flex flex-col font-sans relative overflow-hidden">
            <Navbar />

            {/* Background blobs */}
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] pointer-events-none animate-blob"></div>
            <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }}></div>

            <section className="flex-1 flex flex-col items-center pt-20 pb-24 px-4 relative z-10">

                {/* Page heading */}
                <div className="text-center mb-6 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-[#e0f2fe] text-[#0369a1] text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
    <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ea5e9] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0ea5e9]"></span>
    </span>
    ATS Resume Scanner · Powered by Claude
</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#0f2137] mb-4 leading-tight">
                        Smart feedback for your <br/>
                        <span className="italic" style={{
                            background: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>dream job</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium">
                        Drop your resume and job description — get an instant ATS score and actionable improvement tips.
                    </p>
                </div>

                {/* Processing state */}
                {isProcessing ? (
                    <div className="w-full max-w-lg bg-white rounded-[24px] shadow-sm border-[1.5px] border-[#e2e8f0] p-10 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sky-400 to-[#0b65c2] rounded-b-full"></div>

                        <div className="flex flex-col items-center mb-8">
                            <img src="/images/resume-scan.gif" className="w-32 mb-4 mix-blend-multiply" alt="Scanning"/>
                            <h3 className="text-lg font-bold text-[#0f2137]">Analyzing your resume...</h3>
                            <p className="text-sm text-slate-400 font-medium mt-1">Claude is reviewing every detail</p>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-8">
                            <div
                                className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] rounded-full transition-all duration-700"
                                style={{ width: `${currentStep >= 0 ? ((currentStep + 1) / steps.length) * 100 : 5}%` }}
                            ></div>
                        </div>

                        {/* Step list */}
                        <div className="flex flex-col gap-2">
                            {steps.map((step, i) => (
                                <div key={step.key} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '10px 14px', borderRadius: 10,
                                    background: i === currentStep ? '#f0f8ff' : 'transparent',
                                    border: i === currentStep ? '1px solid #bae6fd' : '1px solid transparent',
                                    transition: 'all 0.3s'
                                }}>
                                    {/* Dot */}
                                    <div style={{
                                        width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                                        background: i < currentStep ? '#16a34a' : i === currentStep ? '#0ea5e9' : '#e2e8f0',
                                        boxShadow: i === currentStep ? '0 0 6px #0ea5e9' : 'none',
                                        transition: 'all 0.3s'
                                    }}/>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: 13, fontWeight: i === currentStep ? 700 : 500,
                                            color: i < currentStep ? '#16a34a' : i === currentStep ? '#0369a1' : '#94a3b8',
                                            transition: 'color 0.3s'
                                        }}>{step.label}</div>
                                        {i === currentStep && (
                                            <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>{step.desc}</div>
                                        )}
                                    </div>
                                    {i < currentStep && (
                                        <svg style={{ width: 14, height: 14, color: '#16a34a', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-xs text-slate-400 font-mono mt-6 uppercase tracking-wider">
                            This usually takes 15–30 seconds
                        </p>
                    </div>
                ) : (
                    /* Form card */
                    <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm border-[1.5px] border-[#e2e8f0] p-8 md:p-10 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sky-400 to-[#0b65c2] rounded-b-full"></div>

                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Row 1 — Company + Job Title */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="company-name" className="uppercase text-[10px] font-mono font-bold text-[#64748b] tracking-widest">
                                        Company Name
                                    </label>
                                    <input
                                        type="text" name="company-name"
                                        placeholder="e.g. Google" id="company-name"
                                        className="w-full px-4 py-3.5 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#0ea5e9] outline-none transition-all placeholder-slate-300 font-medium text-slate-800 text-sm"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="job-title" className="uppercase text-[10px] font-mono font-bold text-[#64748b] tracking-widest">
                                        Job Title
                                    </label>
                                    <input
                                        type="text" name="job-title"
                                        placeholder="e.g. Frontend Engineer" id="job-title"
                                        className="w-full px-4 py-3.5 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#0ea5e9] outline-none transition-all placeholder-slate-300 font-medium text-slate-800 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Row 2 — Job Description */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="job-description" className="uppercase text-[10px] font-mono font-bold text-[#64748b] tracking-widest flex justify-between items-center">
                                    <span>Job Description</span>
                                    <span className="text-[#0ea5e9] font-semibold normal-case text-[10px] bg-[#e0f2fe] px-2 py-0.5 rounded-full">
                                        Recommended for best results
                                    </span>
                                </label>
                                <textarea
                                    rows={6} name="job-description"
                                    placeholder="Paste the full job description here for the most accurate ATS analysis..."
                                    id="job-description"
                                    className="w-full px-4 py-3.5 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#0ea5e9] outline-none transition-all placeholder-slate-300 font-medium text-slate-800 text-sm resize-y"
                                />
                            </div>

                            {/* Row 3 — File uploader */}
                            <div className="flex flex-col gap-2">
                                <label className="uppercase text-[10px] font-mono font-bold text-[#64748b] tracking-widest">
                                    Upload Resume (PDF)
                                </label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            {/* What we analyze strip */}
                            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-5 py-4">
                                <p className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-widest mb-3">
                                    What we analyze
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['ATS Score','Tone & Style','Content Quality','Skills Match','Resume Structure'].map(tag => (
                                        <span key={tag} className="text-xs font-semibold text-[#0369a1] bg-[#e0f2fe] px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!file}
                                className={`relative w-full py-4 rounded-xl font-bold text-base transition-all ${
                                    file
                                        ? 'bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white hover:opacity-90 shadow-md hover:-translate-y-0.5 cursor-pointer'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {file ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                            </svg>
                                            Analyze Resume with AI
                                        </>
                                    ) : (
                                        'Upload a PDF to continue'
                                    )}
                                </span>
                            </button>

                            <p className="text-center text-xs text-slate-400 font-medium -mt-2">
                                Your resume is analyzed privately. We never store or share it.
                            </p>
                        </form>
                    </div>
                )}
            </section>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .font-serif { font-family: 'Instrument Serif', Georgia, serif; }
            `}</style>
        </main>
    );
};

export default Upload;