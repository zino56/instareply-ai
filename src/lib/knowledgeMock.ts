export type DocStatus = 'processing' | 'ready' | 'failed';

export interface KnowledgeDoc {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  status: DocStatus;
  errorMessage?: string;
  pages?: number;
}

export const seedDocuments: KnowledgeDoc[] = [
  {
    id: 'doc-1',
    name: 'FAQ.pdf',
    size: 156_000,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: 'ready',
    pages: 4,
  },
  {
    id: 'doc-2',
    name: 'shipping-policy.pdf',
    size: 89_000,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: 'ready',
    pages: 2,
  },
  {
    id: 'doc-3',
    name: 'return-policy.pdf',
    size: 120_000,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'ready',
    pages: 3,
  },
  {
    id: 'doc-4',
    name: 'pricing-2026.pdf',
    size: 210_000,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 45),
    status: 'processing',
  },
  {
    id: 'doc-5',
    name: 'warranty-terms.pdf',
    size: 340_000,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 20),
    status: 'failed',
    errorMessage: 'Could not extract text. The PDF may be scanned or password-protected.',
  },
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_TYPE = 'application/pdf';
