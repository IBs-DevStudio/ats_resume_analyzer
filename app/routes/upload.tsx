import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const AnimatedBackground = () => (
    <div style={{
        position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
        background: 'linear-gradient(160deg, #f0f8ff 0%, #e0f2fe 50%, #f8fafc 100%)',
    }}>
        <div style={{
            position: 'absolute', width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
            top: -200, right: -100,
            animation: 'blobDrift1 14s ease-in-out infinite alternate',
        }} />
        <div style={{
            position: 'absolute', width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(29,111,220,0.1) 0%, transparent 70%)',
            bottom: -100, left: -80,
            animation: 'blobDrift2 18s ease-in-out infinite alternate',
        }} />
        <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
        }} />
        <style>{`
            @keyframes blobDrift1 {
                from { transform: translate(0,0) scale(1); }
                to { transform: translate(-60px, 80px) scale(1.12); }
            }
            @keyframes blobDrift2 {
                from { transform: translate(0,0) scale(1); }
                to { transform: translate(80px, -60px) scale(1.18); }
            }
        `}</style>
    </div>
);

const steps = [
    { key: 'upload', label: 'Uploading file' },
    { key: 'convert', label: 'Converting to image' },
    { key: 'image', label: 'Uploading image' },
    { key: 'prepare', label: 'Preparing data' },
    { key: 'analyze', label: 'Analyzing resume' },
];

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [currentStep, setCurrentStep] = useState(-1);
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => setFile(file);

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: {
        companyName: string, jobTitle: string, jobDescription: string, file: File
    }) => {
        setIsProcessing(true);

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
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

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
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
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
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <AnimatedBackground />
            <Navbar />
            <main style={{ paddingTop: 64, position: 'relative', zIndex: 1 }}>
                <section style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '48px 16px 80px',
                }}>
                    {/* Page heading */}
                    <div style={{ textAlign: 'center', maxWidth: 600, marginBottom: 40 }}>
                        <div className="sky-tag" style={{ marginBottom: 16 }}>ATS Resume Scanner</div>
                        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, marginBottom: 12 }}>
                            Smart feedback for<br />your dream job
                        </h1>
                        <p style={{
                            color: '#475467', fontSize: 16, lineHeight: 1.7,
                            fontFamily: "'Plus Jakarta Sans', sans-serif"
                        }}>
                            Drop your resume and job description — get an instant ATS score and actionable improvement tips.
                        </p>
                    </div>

                    {/* Processing state */}
                    {isProcessing ? (
                        <div style={{
                            background: '#ffffff',
                            border: '1.5px solid #e2e8f0',
                            borderRadius: 20,
                            padding: '48px 40px',
                            width: '100%',
                            maxWidth: 520,
                            boxShadow: '0 4px 24px rgba(14,165,233,0.08)',
                            textAlign: 'center',
                        }}>
                            <img src="/images/resume-scan.gif" style={{ width: 120, margin: '0 auto 24px', display: 'block', opacity: 0.85 }} />
                            <p style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontWeight: 600, fontSize: 16,
                                color: '#0f172a', marginBottom: 24
                            }}>Analyzing your resume...</p>

                            {/* Step indicators */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
                                {steps.map((step, i) => (
                                    <div key={step.key} style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '10px 14px',
                                        borderRadius: 10,
                                        background: i === currentStep ? '#f0f8ff' : 'transparent',
                                        border: i === currentStep ? '1px solid #bae6fd' : '1px solid transparent',
                                        transition: 'all 0.3s'
                                    }}>
                                        <div style={{
                                            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                                            background: i < currentStep ? '#16a34a' : i === currentStep ? '#0ea5e9' : '#e2e8f0',
                                            boxShadow: i === currentStep ? '0 0 6px #0ea5e9' : 'none',
                                            transition: 'background 0.3s'
                                        }} />
                                        <span style={{
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            fontSize: 13,
                                            color: i < currentStep ? '#16a34a' : i === currentStep ? '#0369a1' : '#94a3b8',
                                            fontWeight: i === currentStep ? 600 : 400,
                                            transition: 'color 0.3s'
                                        }}>{step.label}</span>
                                        {i < currentStep && (
                                            <span style={{ marginLeft: 'auto', color: '#16a34a', fontSize: 12, fontWeight: 600 }}>✓</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Form card */
                        <div style={{
                            background: '#ffffff',
                            border: '1.5px solid #e2e8f0',
                            borderRadius: 20,
                            padding: '40px',
                            width: '100%',
                            maxWidth: 580,
                            boxShadow: '0 4px 24px rgba(14,165,233,0.07)',
                        }}>
                            <form id="upload-form" onSubmit={handleSubmit} style={{
                                display: 'flex', flexDirection: 'column', gap: 20
                            }}>
                                {/* Two col row */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    <div className="form-div">
                                        <label htmlFor="company-name">Company Name</label>
                                        <input
                                            type="text" name="company-name"
                                            placeholder="e.g. Google" id="company-name"
                                        />
                                    </div>
                                    <div className="form-div">
                                        <label htmlFor="job-title">Job Title</label>
                                        <input
                                            type="text" name="job-title"
                                            placeholder="e.g. Frontend Engineer" id="job-title"
                                        />
                                    </div>
                                </div>

                                <div className="form-div">
                                    <label htmlFor="job-description">Job Description</label>
                                    <textarea
                                        rows={6} name="job-description"
                                        placeholder="Paste the full job description here..."
                                        id="job-description"
                                    />
                                </div>

                                <div className="form-div">
                                    <label htmlFor="uploader">Upload Resume (PDF)</label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                <button
                                    className="primary-button"
                                    type="submit"
                                    style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '13px' }}
                                >
                                    Analyze Resume
                                </button>
                            </form>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};
export default Upload;