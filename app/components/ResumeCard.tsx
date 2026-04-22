import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    const title = companyName ? companyName : "General Resume";
    const subTitle = jobTitle ? jobTitle : "No target job specified";

    return (
        <Link to={`/resume/${id}`} className="group block bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(11,101,194,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            
            {/* Top Header */}
            <div className="p-6 pb-4 flex justify-between items-start gap-4">
                <div className="flex flex-col flex-1 min-w-0 mt-2">
                    <h2 className="text-xl font-bold text-[#0f2137] truncate group-hover:text-[#0b65c2] transition-colors">{title}</h2>
                    <h3 className="text-sm font-medium text-slate-500 truncate mt-1">{subTitle}</h3>
                </div>
                <div className="flex-shrink-0 relative origin-top-right transform scale-75">
                    <ScoreCircle score={feedback?.overallScore || 0} />
                </div>
            </div>

            {/* Resume Preview */}
            <div className="px-6 pb-6 pt-2">
                <div className="relative w-full h-[240px] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group-hover:border-[#0b65c2]/30 transition-colors">
                    {resumeUrl ? (
                        <>
                            <img
                                src={resumeUrl}
                                alt="Resume preview"
                                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            {/* Gradient Overlay for hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                                <span className="bg-[#0b65c2] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    View Report
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                             <div className="w-8 h-8 border-2 border-[#0b65c2] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-400/0 to-transparent group-hover:via-sky-400 transition-all duration-700"></div>
        </Link>
    )
}
export default ResumeCard