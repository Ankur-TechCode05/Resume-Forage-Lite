import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up the worker for pdfjs
// @ts-expect-error - pdfjs worker import
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: { str?: string }) => item.str || '')
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
}

export async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith('.pdf')) {
    return extractTextFromPDF(file);
  } else if (name.endsWith('.docx')) {
    return extractTextFromDOCX(file);
  } else if (name.endsWith('.txt')) {
    return file.text();
  } else {
    throw new Error('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
  }
}
