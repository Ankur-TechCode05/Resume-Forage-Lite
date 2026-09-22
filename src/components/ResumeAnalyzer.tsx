import { useState, useRef } from 'react';
import { Upload, FileText, ScanSearch, Target, CheckCircle2, AlertTriangle, XCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { extractTextFromFile } from '@/lib/textExtraction';
import { analyzeResume, matchJobDescription, type ATSResult, type JobMatchResult } from '@/lib/atsEngine';
import { Button, Spinner } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Card, CardBody, Badge } from '@/components/ui/Card';

export function ResumeAnalyzer() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setError(null);
    setResult(null);
    setMatchResult(null);
    setExtractedText('');
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleAnalyze = async () => {
    if (!file && !extractedText) {
      setError('Please upload a resume file or paste text to analyze.');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      let text = extractedText;
      if (file && !text) {
        text = await extractTextFromFile(file);
        setExtractedText(text);
      }

      if (!text.trim()) {
        setError('Could not extract any text from the file. Try a different file or paste text manually.');
        setAnalyzing(false);
        return;
      }

      const atsResult = analyzeResume(text, jobDescription || undefined);
      setResult(atsResult);

      if (jobDescription.trim()) {
        setMatchResult(matchJobDescription(text, jobDescription));
      } else {
        setMatchResult(null);
      }

      // Save to database
      await supabase.from('analyses').insert({
        file_name: file?.name || 'Pasted Text',
        extracted_text: text.substring(0, 10000),
        ats_score: atsResult.score,
        analysis_data: { ats: atsResult, jobMatch: matchJobDescription(text, jobDescription) },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.');
    }

    setAnalyzing(false);
  };

  const scoreColor = (score: number) =>
    score >= 70 ? 'text-green-600' : score >= 40 ? 'text-amber-600' : 'text-red-600';
  const scoreBg = (score: number) =>
    score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Resume Analyzer</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Upload your resume to get an ATS score, detect skills, and find improvement areas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upload area */}
        <Card>
          <CardBody>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Upload Resume</h3>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragActive ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                className="hidden"
              />
              <Upload className="h-8 w-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
              {file ? (
                <div className="flex items-center justify-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <FileText className="h-4 w-4 text-teal-600" />
                  <span className="font-medium">{file.name}</span>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">Drop your resume here or click to browse</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Supports PDF, DOCX, TXT</p>
                </>
              )}
            </div>

            <div className="mt-3">
              <Textarea
                label="Or paste resume text directly"
                rows={5}
                value={extractedText}
                onChange={(e) => { setExtractedText(e.target.value); setResult(null); }}
                placeholder="Paste your resume text here..."
              />
            </div>
          </CardBody>
        </Card>

        {/* Job description */}
        <Card>
          <CardBody>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Job Description (Optional)</h3>
            <Textarea
              rows={10}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste a job description to see how well your resume matches the required skills and keywords..."
            />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">We'll compare your resume against the job description and show matching and missing skills.</p>
          </CardBody>
        </Card>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">{error}</div>
      )}

      <div className="flex justify-center mb-8">
        <Button size="lg" onClick={handleAnalyze} disabled={analyzing}>
          {analyzing ? <Spinner /> : <ScanSearch className="h-5 w-5" />}
          {analyzing ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      </div>

      {result && (
        <div className="space-y-5">
          {/* Score */}
          <Card>
            <CardBody className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="relative h-28 w-28">
                  <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8"
                      strokeDasharray={`${(result.score / 100) * 264} 264`}
                      strokeLinecap="round"
                      className={scoreColor(result.score)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${scoreColor(result.score)}`}>{result.score}</span>
                    <span className="text-xs text-slate-400">ATS Score</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {result.score >= 70 ? 'Good match!' : result.score >= 40 ? 'Needs improvement' : 'Below average'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{result.wordCount} words detected</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {result.sections.map((s) => <Badge key={s} color="green">{s}</Badge>)}
                  {result.missingSections.map((s) => <Badge key={s} color="red">Missing: {s}</Badge>)}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Job match */}
          {matchResult && (
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-teal-600" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Job Description Match</h3>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-3xl font-bold ${scoreColor(matchResult.matchPercentage)}`}>{matchResult.matchPercentage}%</div>
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <div className={`h-full rounded-full ${scoreBg(matchResult.matchPercentage)} transition-all`} style={{ width: `${matchResult.matchPercentage}%` }} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Matching Skills ({matchResult.matchingSkills.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {matchResult.matchingSkills.length === 0 ? <span className="text-xs text-slate-400 dark:text-slate-500">No matching skills found</span> :
                        matchResult.matchingSkills.map((s) => <Badge key={s} color="green">{s}</Badge>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-1"><XCircle className="h-3.5 w-3.5" /> Missing Skills ({matchResult.missingSkills.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {matchResult.missingSkills.length === 0 ? <span className="text-xs text-slate-400 dark:text-slate-500">No missing skills!</span> :
                        matchResult.missingSkills.map((s) => <Badge key={s} color="red">{s}</Badge>)}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Detected skills */}
          <Card>
            <CardBody>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Detected Skills ({result.detectedSkills.length})</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.detectedSkills.length === 0 ? <span className="text-sm text-slate-400 dark:text-slate-500">No skills detected. Add more technical keywords to your resume.</span> :
                  result.detectedSkills.map((s) => <Badge key={s} color="teal">{s}</Badge>)}
              </div>
            </CardBody>
          </Card>

          {/* Issues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.formattingIssues.length > 0 && (
              <Card>
                <CardBody>
                  <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-4 w-4 text-amber-500" /><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Formatting Issues</h3></div>
                  <ul className="space-y-1.5">
                    {result.formattingIssues.map((issue, i) => <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex gap-1.5"><span className="text-amber-500">•</span>{issue}</li>)}
                  </ul>
                </CardBody>
              </Card>
            )}
            {result.contentIssues.length > 0 && (
              <Card>
                <CardBody>
                  <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-4 w-4 text-amber-500" /><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Content Issues</h3></div>
                  <ul className="space-y-1.5">
                    {result.contentIssues.map((issue, i) => <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex gap-1.5"><span className="text-amber-500">•</span>{issue}</li>)}
                  </ul>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-3"><Lightbulb className="h-4 w-4 text-teal-600 dark:text-teal-400" /><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Suggestions for Improvement</h3></div>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                      <span className="text-teal-600 font-bold flex-shrink-0">{i + 1}.</span>{s}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}

          {/* Missing keywords from JD */}
          {result.missingKeywords.length > 0 && (
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-3"><XCircle className="h-4 w-4 text-red-500" /><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Missing Keywords from Job Description</h3></div>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords.map((kw) => <Badge key={kw} color="red">{kw}</Badge>)}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
