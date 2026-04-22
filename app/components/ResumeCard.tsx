import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const scoreColor = (score: number) => {
  if (score >= 80) return '#4ade80';
  if (score >= 60) return '#fbbf24';
  return '#f87171';
};

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            setResumeUrl(URL.createObjectURL(blob));
        };
        loadResume();
    }, [imagePath]);

    const score = feedback.overallScore;
    const color = scoreColor(score);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-700" style={{ textDecoration: 'none' }}>
            <div className="resume-card-header">
                <div className="flex flex-col gap-1" style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: '0.12em',
                        color: '#00d4ff',
                        textTransform: 'uppercase',
                        opacity: 0.7,
                        marginBottom: 2
                    }}>Target Role</div>
                    {companyName && (
                        <h2 style={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 18,
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>{companyName}</h2>
                    )}
                    {jobTitle && (
                        <p style={{
                            color: '#8892a4',
                            fontSize: 13,
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: "'DM Mono', monospace"
                        }}>{jobTitle}</p>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={score} />
                </div>
            </div>

            {/* Mini score bars */}
            <div style={{ display: 'flex', gap: 6 }}>
                {(['ATS', 'content', 'skills', 'structure'] as const).map((key) => (
                    <div key={key} style={{ flex: 1 }}>
                        <div style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 8,
                            color: '#8892a4',
                            marginBottom: 3,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase'
                        }}>{key}</div>
                        <div style={{
                            height: 3,
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                height: '100%',
                                width: `${feedback[key]?.score ?? 0}%`,
                                background: scoreColor(feedback[key]?.score ?? 0),
                                borderRadius: 2,
                                transition: 'width 0.6s ease',
                                boxShadow: `0 0 4px ${scoreColor(feedback[key]?.score ?? 0)}88`
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            {resumeUrl && (
                <div style={{
                    border: '1px solid rgba(0,212,255,0.12)',
                    borderRadius: 10,
                    overflow: 'hidden',
                    flex: 1
                }}>
                    <img
                        src={resumeUrl}
                        alt="resume preview"
                        style={{
                            width: '100%',
                            height: 300,
                            objectFit: 'cover',
                            objectPosition: 'top',
                            display: 'block',
                            opacity: 0.9
                        }}
                    />
                </div>
            )}

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 4
            }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: color,
                    letterSpacing: '0.08em'
                }}>
                    {score >= 80 ? '● STRONG MATCH' : score >= 60 ? '● MODERATE MATCH' : '● NEEDS WORK'}
                </span>
                <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: '#00d4ff',
                    letterSpacing: '0.05em',
                    opacity: 0.7
                }}>VIEW ANALYSIS →</span>
            </div>
        </Link>
    );
};
export default ResumeCard;