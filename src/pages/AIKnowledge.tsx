import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  X,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Truck,
  RefreshCw,
  DollarSign,
  Shield,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  status: 'processing' | 'ready' | 'error';
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const suggestedDocuments = [
  { icon: HelpCircle, label: 'FAQ / Questions', description: 'Common customer questions' },
  { icon: Truck, label: 'Shipping & Delivery', description: 'Delivery times and methods' },
  { icon: RefreshCw, label: 'Return & Refund Policy', description: 'Return procedures' },
  { icon: DollarSign, label: 'Pricing & Payment', description: 'Payment methods and pricing' },
  { icon: Shield, label: 'Privacy Policy', description: 'Data handling practices' },
  { icon: FileCheck, label: 'Terms & Conditions', description: 'Legal agreements' },
];

export default function AIKnowledge() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    { id: '1', name: 'FAQ.pdf', size: 156000, uploadedAt: new Date(), status: 'ready' },
    { id: '2', name: 'shipping.pdf', size: 89000, uploadedAt: new Date(), status: 'ready' },
    { id: '3', name: 'return_policy.pdf', size: 120000, uploadedAt: new Date(), status: 'ready' },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState<UploadedDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new documents
          const newDocs: UploadedDocument[] = Array.from(files).map((file, index) => ({
            id: `doc-${Date.now()}-${index}`,
            name: file.name,
            size: file.size,
            uploadedAt: new Date(),
            status: 'ready' as const,
          }));

          setDocuments((prev) => [...prev, ...newDocs]);
          toast({
            title: 'Documents uploaded',
            description: `${files.length} document(s) have been added to your AI knowledge base.`,
          });

          return 0;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const pdfFiles = Array.from(files).filter((file) => file.type === 'application/pdf');
      if (pdfFiles.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Invalid file type',
          description: 'Please upload PDF files only.',
        });
        return;
      }
      simulateUpload(e.dataTransfer.files);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(files);
    }
  };

  const handleRemove = (doc: UploadedDocument) => {
    setDeleteDoc(doc);
  };

  const confirmRemove = () => {
    if (deleteDoc) {
      setDocuments((prev) => prev.filter((d) => d.id !== deleteDoc.id));
      toast({
        title: 'Document removed',
        description: `${deleteDoc.name} has been removed from your AI knowledge base.`,
      });
      setDeleteDoc(null);
    }
  };

  const readyDocuments = documents.filter((d) => d.status === 'ready').length;
  const allReady = documents.length > 0 && readyDocuments === documents.length;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-4xl mx-auto w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 md:space-y-8"
      >
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="text-[24px] md:text-[28px] font-semibold tracking-tight md:tracking-[-0.02em] leading-tight text-foreground">AI Knowledge Base</h1>
          <p className="text-muted-foreground mt-1.5 text-[14px] max-w-2xl">
            Upload your business documents so the AI can provide accurate, personalized responses to your customers.
          </p>
        </motion.div>


        {/* Upload Area */}
        <motion.div variants={item}>
          <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
            <CardContent className="p-6">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  'relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300',
                  isDragging
                    ? 'border-primary bg-primary/5 scale-[1.02]'
                    : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                )}
              >
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Upload className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">Uploading documents...</p>
                      <Progress value={uploadProgress} className="w-64 mx-auto" />
                      <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                      <FileText className={cn(
                        'w-8 h-8 transition-colors',
                        isDragging ? 'text-primary' : 'text-muted-foreground'
                      )} />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        {isDragging ? 'Drop your PDFs here!' : 'Drag your PDFs here'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        or click to browse your files
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      PDF files only • Max 10MB per file
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What to Upload */}
        <motion.div variants={item}>
          <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-[14px] font-semibold text-foreground">Recommended documents</CardTitle>
              <CardDescription className="text-[13px]">These documents help your AI provide accurate answers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {suggestedDocuments.map((doc) => (
                  <div
                    key={doc.label}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border/60 bg-background hover:border-border hover:bg-muted/40 transition-colors"
                  >
                    <div className="p-2 rounded-md bg-muted shrink-0">
                      <doc.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-foreground">{doc.label}</p>
                      <p className="text-[11.5px] text-muted-foreground mt-0.5">{doc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Uploaded Documents */}
        <motion.div variants={item}>
          <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[14px] font-semibold text-foreground">Your documents</CardTitle>
                  <CardDescription className="text-[13px]">
                    {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
                  </CardDescription>
                </div>
                {allReady && (
                  <Badge className="bg-success/10 text-success border-0 h-5 font-medium">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    All Ready
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No documents uploaded yet</p>
                  <p className="text-sm">Upload your first PDF to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-background">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(doc.size)} • {formatDate(doc.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === 'ready' && (
                          <Badge variant="outline" className="h-5 px-1.5 text-[11px] font-medium rounded-md bg-success/10 text-success border-0">
                            Ready
                          </Badge>
                        )}
                        {doc.status === 'processing' && (
                          <Badge variant="outline" className="h-5 px-1.5 text-[11px] font-medium rounded-md bg-warning/10 text-warning border-0">
                            Processing
                          </Badge>
                        )}
                        {doc.status === 'error' && (
                          <Badge variant="outline" className="h-5 px-1.5 text-[11px] font-medium rounded-md bg-destructive/10 text-destructive border-0">
                            Error
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(doc)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Status */}
        {documents.length > 0 && (
          <motion.div variants={item}>
            <Card className={cn(
              'rounded-2xl border shadow-[var(--shadow-sm)] bg-card',
              allReady ? 'border-success/25' : 'border-warning/30'
            )}>
              <CardContent className="p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', allReady ? 'bg-success/12' : 'bg-warning/12')}>
                    {allReady ? (
                      <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.75} />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-warning" strokeWidth={1.75} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[15px] text-foreground">
                      {allReady ? 'Knowledge base is ready' : 'Processing documents…'}
                    </p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">
                      {allReady
                        ? 'Your AI is using these documents to answer customer questions.'
                        : 'Some documents are still being processed. Please wait.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-2" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
            <Upload className="w-4 h-4" strokeWidth={1.75} />
            Add more
          </Button>
          <Button size="sm" className="h-9 gap-2" disabled={!allReady || documents.length === 0}>
            <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
            Continue
          </Button>
        </motion.div>

      </motion.div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteDoc} onOpenChange={() => setDeleteDoc(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{deleteDoc?.name}"? Your AI will no longer use this document for responses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
