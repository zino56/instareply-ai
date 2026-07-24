import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Search,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { pageContainer as container, pageItem as item } from '@/lib/motion';
import {
  seedDocuments,
  MAX_FILE_SIZE,
  ACCEPTED_TYPE,
  type KnowledgeDoc,
  type DocStatus,
} from '@/lib/knowledgeMock';

type StatusFilter = 'all' | DocStatus;
type QAState = 'loading' | 'error' | 'empty' | null;

interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AIKnowledge() {
  const [searchParams] = useSearchParams();
  const qaState = (searchParams.get('knowledgeState') as QAState) || null;

  const [documents, setDocuments] = useState<KnowledgeDoc[]>(
    qaState === 'empty' ? [] : seedDocuments,
  );
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [rejections, setRejections] = useState<{ name: string; reason: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState<KnowledgeDoc | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const { toast } = useToast();

  // Simulate processing → ready transitions
  useEffect(() => {
    const processing = documents.filter((d) => d.status === 'processing');
    if (processing.length === 0) return;
    const timers = processing.map((doc) =>
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, status: 'ready' as const, pages: Math.max(1, Math.round(d.size / 60_000)) } : d)),
        );
      }, 2500 + Math.random() * 1500),
    );
    return () => timers.forEach(clearTimeout);
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (query && !d.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [documents, query, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: documents.length,
      ready: documents.filter((d) => d.status === 'ready').length,
      processing: documents.filter((d) => d.status === 'processing').length,
      failed: documents.filter((d) => d.status === 'failed').length,
    };
  }, [documents]);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const files = Array.from(fileList);
      const accepted: File[] = [];
      const rejected: { name: string; reason: string }[] = [];

      files.forEach((file) => {
        if (file.type !== ACCEPTED_TYPE) {
          rejected.push({ name: file.name, reason: 'Not a PDF' });
        } else if (file.size > MAX_FILE_SIZE) {
          rejected.push({ name: file.name, reason: 'Exceeds 10 MB' });
        } else {
          accepted.push(file);
        }
      });

      if (rejected.length > 0) {
        setRejections(rejected);
      }

      accepted.forEach((file) => {
        const id = `up-${Date.now()}-${file.name}`;
        const uf: UploadingFile = { id, name: file.name, size: file.size, progress: 0 };
        setUploading((prev) => [...prev, uf]);

        const interval = setInterval(() => {
          setUploading((prev) => {
            const target = prev.find((u) => u.id === id);
            if (!target) {
              clearInterval(interval);
              return prev;
            }
            const next = Math.min(100, target.progress + 12 + Math.random() * 10);
            if (next >= 100) {
              clearInterval(interval);
              // Move to documents as processing
              setDocuments((docs) => [
                {
                  id: `doc-${Date.now()}-${file.name}`,
                  name: file.name,
                  size: file.size,
                  uploadedAt: new Date(),
                  status: 'processing',
                },
                ...docs,
              ]);
              setTimeout(() => setUploading((p) => p.filter((u) => u.id !== id)), 300);
            }
            return prev.map((u) => (u.id === id ? { ...u, progress: next } : u));
          });
        }, 180);
      });

      if (accepted.length > 0) {
        toast({
          title: `${accepted.length} file${accepted.length > 1 ? 's' : ''} uploading`,
          description: 'Documents will start processing when upload completes.',
        });
      }
    },
    [toast],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleRetry = (doc: KnowledgeDoc) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, status: 'processing' as const, errorMessage: undefined } : d)),
    );
    toast({ title: 'Retrying', description: `${doc.name} is being reprocessed.` });
  };

  const confirmRemove = () => {
    if (!deleteDoc) return;
    setDocuments((prev) => prev.filter((d) => d.id !== deleteDoc.id));
    toast({
      title: 'Document removed',
      description: `${deleteDoc.name} has been removed from your knowledge base.`,
    });
    setDeleteDoc(null);
  };

  const triggerFilePicker = () => {
    document.getElementById('knowledge-file-input')?.click();
  };

  const clearFilters = () => {
    setQuery('');
    setStatusFilter('all');
  };
  const hasActiveFilters = query !== '' || statusFilter !== 'all';

  // ---------- QA / Loading / Error states ----------
  const isLoading = qaState === 'loading';
  const isError = qaState === 'error';

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-4xl mx-auto w-full">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-[22px] md:text-[26px] font-semibold md:tracking-[-0.015em] leading-tight text-foreground">
              AI Knowledge Base
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[14px] max-w-2xl">
              Upload PDFs so your AI can answer customer questions using your business information.
            </p>
            {!isLoading && !isError && documents.length > 0 && (
              <p className="text-[12px] text-muted-foreground mt-2 tabular-nums">
                {counts.total} document{counts.total !== 1 ? 's' : ''} · {counts.ready} ready
                {counts.processing > 0 && ` · ${counts.processing} processing`}
                {counts.failed > 0 && ` · ${counts.failed} failed`}
              </p>
            )}
          </div>
          <Button onClick={triggerFilePicker} className="h-10 gap-2 min-h-[44px] sm:min-h-[40px]">
            <Upload className="w-4 h-4" strokeWidth={2} />
            Upload PDFs
          </Button>
        </motion.div>

        <input
          id="knowledge-file-input"
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Status banner */}
        {!isLoading && !isError && documents.length > 0 && (
          <motion.div variants={item}>
            <Card
              className={cn(
                'rounded-2xl border shadow-[var(--shadow-sm)] bg-card',
                counts.failed > 0
                  ? 'border-destructive/30'
                  : counts.processing > 0
                    ? 'border-warning/30'
                    : 'border-success/25',
              )}
            >
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                      counts.failed > 0
                        ? 'bg-destructive/10'
                        : counts.processing > 0
                          ? 'bg-warning/12'
                          : 'bg-success/12',
                    )}
                  >
                    {counts.failed > 0 ? (
                      <AlertCircle className="w-5 h-5 text-destructive" strokeWidth={1.75} />
                    ) : counts.processing > 0 ? (
                      <Loader2 className="w-5 h-5 text-warning animate-spin" strokeWidth={1.75} />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.75} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[14px] text-foreground">
                      {counts.failed > 0
                        ? `${counts.failed} document${counts.failed > 1 ? 's' : ''} failed to process`
                        : counts.processing > 0
                          ? `Processing ${counts.processing} document${counts.processing > 1 ? 's' : ''}…`
                          : 'Knowledge base is ready'}
                    </p>
                    <p className="text-[12.5px] text-muted-foreground mt-0.5">
                      {counts.failed > 0
                        ? 'Retry failed documents or remove them to keep your AI accurate.'
                        : counts.processing > 0
                          ? 'This usually takes a few seconds per file.'
                          : 'Your AI is using these documents to answer customer questions.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Dropzone + in-flight uploads */}
        {!isLoading && !isError && (
          <motion.div variants={item}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                'relative border-2 border-dashed rounded-2xl p-8 md:p-10 text-center transition-all duration-300',
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border/70 hover:border-primary/50 hover:bg-muted/40',
              )}
            >
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                  <Upload
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isDragging ? 'text-primary' : 'text-muted-foreground',
                    )}
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">
                    {isDragging ? 'Drop your PDFs here' : 'Drag and drop PDFs, or'}{' '}
                    {!isDragging && (
                      <button
                        type="button"
                        onClick={triggerFilePicker}
                        className="text-primary hover:underline underline-offset-2"
                      >
                        browse files
                      </button>
                    )}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1">
                    PDF files only · Max 10 MB per file
                  </p>
                </div>
              </div>

              {uploading.length > 0 && (
                <div className="mt-6 space-y-2 text-left">
                  {uploading.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background"
                    >
                      <FileText className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.75} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[12.5px] font-medium text-foreground truncate">{u.name}</p>
                          <p className="text-[11.5px] text-muted-foreground tabular-nums">
                            {Math.round(u.progress)}%
                          </p>
                        </div>
                        <Progress value={u.progress} className="mt-1.5 h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {rejections.length > 0 && (
              <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 text-[12.5px]">
                    <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" strokeWidth={1.75} />
                    <div>
                      <p className="font-medium text-foreground">
                        {rejections.length} file{rejections.length > 1 ? 's' : ''} rejected
                      </p>
                      <ul className="mt-1 space-y-0.5 text-muted-foreground">
                        {rejections.slice(0, 4).map((r) => (
                          <li key={r.name} className="truncate">
                            <span className="text-foreground">{r.name}</span> — {r.reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRejections([])}
                    aria-label="Dismiss rejections"
                    className="text-muted-foreground hover:text-foreground shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Toolbar */}
        {!isLoading && !isError && documents.length > 0 && (
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents…"
                className="pl-9 h-10 min-h-[44px] sm:min-h-[40px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground sm:hidden" />
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
                <SelectTrigger className="w-full sm:w-[180px] h-10 min-h-[44px] sm:min-h-[40px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-10 min-h-[44px] sm:min-h-[40px]">
                  Clear
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Document list — states */}
        <motion.div variants={item}>
          {isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg border border-border/60 bg-muted/40 skeleton-shimmer"
                />
              ))}
            </div>
          )}

          {isError && (
            <Card className="rounded-2xl border border-destructive/30 shadow-[var(--shadow-sm)]">
              <CardContent className="p-8 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
                  <AlertCircle className="w-5 h-5 text-destructive" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-medium text-[14px] text-foreground">Couldn't load your knowledge base</p>
                  <p className="text-[12.5px] text-muted-foreground mt-1">
                    Something went wrong on our side. Please try again.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {!isLoading && !isError && documents.length === 0 && (
            <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)]">
              <CardContent className="p-10 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted">
                  <FileText className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-[15px] text-foreground">
                    Add your first document
                  </p>
                  <p className="text-[13px] text-muted-foreground mt-1 max-w-sm mx-auto">
                    Upload a PDF like your FAQ, shipping policy, or product guide so your AI can answer with your business information.
                  </p>
                </div>
                <Button onClick={triggerFilePicker} className="h-10 gap-2 min-h-[44px] sm:min-h-[40px]">
                  <Upload className="w-4 h-4" strokeWidth={2} />
                  Upload your first PDF
                </Button>
              </CardContent>
            </Card>
          )}

          {!isLoading && !isError && documents.length > 0 && filteredDocuments.length === 0 && (
            <div className="text-center py-10 rounded-2xl border border-dashed border-border/70">
              <p className="text-[13.5px] text-foreground font-medium">No documents match your filters</p>
              <p className="text-[12.5px] text-muted-foreground mt-1">Try clearing the search or status filter.</p>
              <Button variant="outline" size="sm" onClick={clearFilters} className="mt-3 h-9">
                Clear filters
              </Button>
            </div>
          )}

          {!isLoading && !isError && filteredDocuments.length > 0 && (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border/60 bg-background hover:bg-muted/40 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-md bg-muted shrink-0">
                      <FileText className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[13px] text-foreground truncate">{doc.name}</p>
                      <p className="text-[11.5px] text-muted-foreground tabular-nums mt-0.5">
                        {formatFileSize(doc.size)}
                        {doc.pages ? ` · ${doc.pages} page${doc.pages > 1 ? 's' : ''}` : ''} ·{' '}
                        {formatDate(doc.uploadedAt)}
                      </p>
                      {doc.status === 'failed' && doc.errorMessage && (
                        <p className="text-[11.5px] text-destructive mt-1 line-clamp-2">
                          {doc.errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {doc.status === 'ready' && (
                      <Badge className="h-5 px-1.5 text-[11px] font-medium rounded-md bg-success/10 text-success border-0">
                        Ready
                      </Badge>
                    )}
                    {doc.status === 'processing' && (
                      <Badge className="h-5 px-1.5 text-[11px] font-medium rounded-md bg-warning/10 text-warning border-0 gap-1">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        Processing
                      </Badge>
                    )}
                    {doc.status === 'failed' && (
                      <>
                        <Badge className="h-5 px-1.5 text-[11px] font-medium rounded-md bg-destructive/10 text-destructive border-0">
                          Failed
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRetry(doc)}
                          className="h-8 min-h-[44px] sm:min-h-[32px] px-2 text-muted-foreground hover:text-foreground"
                          aria-label={`Retry ${doc.name}`}
                        >
                          <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteDoc(doc)}
                      className="h-8 min-h-[44px] sm:min-h-[32px] px-2 text-muted-foreground hover:text-destructive md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      aria-label={`Remove ${doc.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteDoc} onOpenChange={() => setDeleteDoc(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{deleteDoc?.name}"? Your AI will no longer use this document to answer customer questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
