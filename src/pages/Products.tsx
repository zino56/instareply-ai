import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Plus,
  Upload,
  Edit2,
  Trash2,
  Package,
  FileJson,
  FileSpreadsheet,
  ShoppingBag,
  MoreVertical,
  AlertCircle,
  RefreshCw,
  LayoutGrid,
  Rows3,
  Copy,
  Archive,
  ArchiveRestore,
  Link2,
  X,
  Loader2,
  ChevronDown,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { api } from '@/lib/api';
import type { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { pageContainer as container, pageItem as item } from '@/lib/motion';
import { mockProducts, type UiProduct } from '@/lib/productsMock';

type Status = 'all' | 'active' | 'inactive' | 'archived';
type Quality = 'no_image' | 'no_desc';
type Sort = 'newest' | 'name_asc' | 'price_asc' | 'price_desc';
type ViewMode = 'grid' | 'table';
type QaState = 'ready' | 'loading' | 'error' | 'empty';

interface FormValues {
  title: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  is_active: boolean;
}

const emptyForm: FormValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  image_url: '',
  is_active: true,
};

const MAX_DESC = 500;

export default function Products() {
  const [searchParams] = useSearchParams();
  const qaState = (searchParams.get('prodState') as QaState) || 'ready';

  const [products, setProducts] = useState<UiProduct[]>([]);
  const [status, setStatus] = useState<QaState>('loading');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status>('all');
  const [qualityFilters, setQualityFilters] = useState<Quality[]>([]);
  const [sort, setSort] = useState<Sort>('newest');
  const [view, setView] = useState<ViewMode>('grid');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const [archiveTarget, setArchiveTarget] = useState<UiProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UiProduct | null>(null);

  const { toast } = useToast();

  // Load
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setStatus('loading');
      if (qaState === 'loading') return;
      if (qaState === 'error') {
        setTimeout(() => !cancelled && setStatus('error'), 400);
        return;
      }
      if (qaState === 'empty') {
        setTimeout(() => {
          if (!cancelled) {
            setProducts([]);
            setStatus('ready');
          }
        }, 400);
        return;
      }
      try {
        const data = await api.getProducts();
        const arr = Array.isArray(data) ? data : data?.data || [];
        if (cancelled) return;
        setProducts(arr.length ? (arr as UiProduct[]) : mockProducts);
        setStatus('ready');
      } catch {
        if (cancelled) return;
        setProducts(mockProducts);
        setStatus('ready');
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [qaState]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.category).filter((c): c is string => !!c)),
      ).sort(),
    [products],
  );

  const activeCount = useMemo(
    () => products.filter((p) => p.is_active && !p.archived).length,
    [products],
  );
  const totalValue = useMemo(
    () => products.filter((p) => !p.archived).reduce((s, p) => s + (p.price || 0), 0),
    [products],
  );

  const filtered = useMemo(() => {
    let list = [...products];
    // status filter
    if (statusFilter === 'active') list = list.filter((p) => p.is_active && !p.archived);
    else if (statusFilter === 'inactive') list = list.filter((p) => !p.is_active && !p.archived);
    else if (statusFilter === 'archived') list = list.filter((p) => !!p.archived);
    else list = list.filter((p) => !p.archived);
    // quality
    if (qualityFilters.includes('no_image')) list = list.filter((p) => !p.image_url);
    if (qualityFilters.includes('no_desc')) list = list.filter((p) => !p.description?.trim());
    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q),
      );
    }
    // sort
    list.sort((a, b) => {
      switch (sort) {
        case 'name_asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'price_asc':
          return (a.price || 0) - (b.price || 0);
        case 'price_desc':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
        default:
          return +new Date(b.created_at || 0) - +new Date(a.created_at || 0);
      }
    });
    return list;
  }, [products, statusFilter, qualityFilters, searchQuery, sort]);

  const anyFilterActive =
    !!searchQuery || statusFilter !== 'all' || qualityFilters.length > 0;

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setQualityFilters([]);
  };

  const toggleQuality = (q: Quality) =>
    setQualityFilters((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]));

  /* -------- Actions -------- */

  const openAdd = () => {
    setFormMode('add');
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
    setSaveError(null);
    setIsFormOpen(true);
  };

  const openEdit = (p: UiProduct) => {
    setFormMode('edit');
    setEditingId(p.id);
    setForm({
      title: p.title || '',
      description: p.description || '',
      price: String(p.price ?? ''),
      category: p.category || '',
      image_url: p.image_url || '',
      is_active: !!p.is_active,
    });
    setFormErrors({});
    setSaveError(null);
    setIsFormOpen(true);
  };

  const validate = (v: FormValues) => {
    const e: Partial<Record<keyof FormValues, string>> = {};
    if (!v.title.trim() || v.title.trim().length < 2) e.title = 'Title must be at least 2 characters.';
    else if (v.title.length > 80) e.title = 'Title must be under 80 characters.';
    if (!v.description.trim()) e.description = 'Description is required.';
    else if (v.description.length > MAX_DESC) e.description = `Max ${MAX_DESC} characters.`;
    const price = Number(v.price);
    if (v.price === '' || Number.isNaN(price) || price < 0) e.price = 'Enter a valid price.';
    if (v.image_url && !/^https?:\/\//i.test(v.image_url)) e.image_url = 'Must be a valid URL.';
    return e;
  };

  const handleSave = async () => {
    const errs = validate(form);
    setFormErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    setSaveError(null);
    try {
      await new Promise((res) => setTimeout(res, 600));
      // 8% chance of demo failure to exercise failed state
      if (Math.random() < 0.08) throw new Error('Network hiccup — please retry.');
      const price = Number(form.price);
      if (formMode === 'add') {
        const p: UiProduct = {
          id: `p-${Date.now()}`,
          title: form.title.trim(),
          description: form.description.trim(),
          price,
          category: form.category.trim() || undefined,
          image_url: form.image_url.trim() || undefined,
          is_active: form.is_active,
          created_at: new Date().toISOString(),
        };
        setProducts((prev) => [p, ...prev]);
        toast({ title: 'Product added', description: p.title });
      } else if (editingId) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  title: form.title.trim(),
                  description: form.description.trim(),
                  price,
                  category: form.category.trim() || undefined,
                  image_url: form.image_url.trim() || undefined,
                  is_active: form.is_active,
                }
              : p,
          ),
        );
        toast({ title: 'Changes saved' });
      }
      setIsFormOpen(false);
    } catch (err: any) {
      setSaveError(err?.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (p: UiProduct) => {
    const prev = p.is_active;
    setSavingIds((s) => new Set(s).add(p.id));
    setProducts((list) => list.map((x) => (x.id === p.id ? { ...x, is_active: !prev } : x)));
    try {
      await new Promise((res) => setTimeout(res, 400));
      if (Math.random() < 0.05) throw new Error('fail');
    } catch {
      setProducts((list) => list.map((x) => (x.id === p.id ? { ...x, is_active: prev } : x)));
      toast({
        variant: 'destructive',
        title: 'Couldn\u2019t update status',
        description: 'Please try again.',
      });
    } finally {
      setSavingIds((s) => {
        const n = new Set(s);
        n.delete(p.id);
        return n;
      });
    }
  };

  const duplicate = (p: UiProduct) => {
    const copy: UiProduct = {
      ...p,
      id: `p-${Date.now()}`,
      title: `${p.title} (copy)`,
      is_active: false,
      archived: false,
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => [copy, ...prev]);
    toast({ title: 'Duplicated', description: copy.title });
  };

  const archive = (p: UiProduct) => {
    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, archived: true, is_active: false } : x)),
    );
    toast({ title: 'Archived', description: p.title });
  };

  const unarchive = (p: UiProduct) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, archived: false } : x)));
    toast({ title: 'Unarchived', description: p.title });
  };

  const remove = (p: UiProduct) => {
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
    toast({ title: 'Deleted', description: p.title });
  };

  const handleImport = async () => {
    setImporting(true);
    setImportError(null);
    try {
      let parsed: any;
      try {
        parsed = JSON.parse(jsonInput);
      } catch (err: any) {
        throw new Error(`Invalid JSON — ${err.message}`);
      }
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      let added = 0;
      let skipped = 0;
      const newOnes: UiProduct[] = [];
      arr.forEach((raw, i) => {
        const errs = validate({
          title: String(raw.title || ''),
          description: String(raw.description || ''),
          price: String(raw.price ?? ''),
          category: String(raw.category || ''),
          image_url: String(raw.image_url || ''),
          is_active: raw.is_active !== false,
        });
        if (Object.keys(errs).length) {
          skipped++;
          return;
        }
        newOnes.push({
          id: `p-${Date.now()}-${i}`,
          title: String(raw.title).trim(),
          description: String(raw.description).trim(),
          price: Number(raw.price),
          category: raw.category ? String(raw.category) : undefined,
          image_url: raw.image_url ? String(raw.image_url) : undefined,
          is_active: raw.is_active !== false,
          created_at: new Date().toISOString(),
        });
        added++;
      });
      await new Promise((res) => setTimeout(res, 500));
      setProducts((prev) => [...newOnes, ...prev]);
      setIsImportOpen(false);
      setJsonInput('');
      toast({
        title: 'Import complete',
        description: `${added} added${skipped ? ` · ${skipped} skipped` : ''}.`,
      });
    } catch (err: any) {
      setImportError(err?.message || 'Import failed.');
    } finally {
      setImporting(false);
    }
  };

  const exampleJson = `[
  {
    "title": "Product Name",
    "description": "Short description",
    "price": 29.99,
    "image_url": "https://example.com/image.jpg",
    "category": "Category"
  }
]`;

  /* -------- Render -------- */

  return (
    <TooltipProvider delayDuration={200}>
      <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-[1400px] mx-auto w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8">
          {/* Header */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-[22px] md:text-[26px] font-semibold md:tracking-[-0.015em] leading-tight text-foreground">
                Products
              </h1>
              <p className="text-muted-foreground mt-1.5 text-[14px] tabular-nums">
                {products.filter((p) => !p.archived).length} products · {activeCount} active
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="h-9 gap-1.5 press-scale">
                    <Plus className="w-4 h-4" strokeWidth={1.75} />
                    Add product
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={openAdd}>
                    <Plus className="w-3.5 h-3.5 mr-2" /> Add manually
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsImportOpen(true)}>
                    <FileJson className="w-3.5 h-3.5 mr-2" /> Import JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="space-y-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Products" value={products.filter((p) => !p.archived).length.toString()} icon={<Package className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />} />
              <StatCard label="Active Products" value={activeCount.toString()} icon={<ShoppingBag className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />} />
              <StatCard label="Catalog Value" value={`$${totalValue.toFixed(2)}`} icon={<span className="text-muted-foreground text-[13px] font-semibold w-4 h-4 flex items-center justify-center">$</span>} />
            </div>
          </motion.div>

          {/* Toolbar */}
          <motion.div variants={item} className="sticky top-0 z-10 -mx-4 px-4 sm:mx-0 sm:px-0 bg-background/85 backdrop-blur pt-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-[13px]"
                />
              </div>

              <div className="flex items-center flex-wrap gap-1.5">
                {(['all', 'active', 'inactive', 'archived'] as Status[]).map((s) => (
                  <ChipButton key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
                    {s === 'all' ? 'All' : s === 'active' ? 'Active' : s === 'inactive' ? 'Inactive' : 'Archived'}
                  </ChipButton>
                ))}
                <span className="w-px h-4 bg-border/60 mx-1" />
                <ChipButton active={qualityFilters.includes('no_image')} onClick={() => toggleQuality('no_image')}>
                  Missing image
                </ChipButton>
                <ChipButton active={qualityFilters.includes('no_desc')} onClick={() => toggleQuality('no_desc')}>
                  No description
                </ChipButton>
                {anyFilterActive && (
                  <button
                    onClick={clearFilters}
                    className="h-7 px-2 rounded-md text-[11.5px] text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1 focus-ring"
                  >
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <div className="md:ml-auto flex items-center gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 px-2.5 rounded-md text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted focus-ring inline-flex items-center gap-1">
                      {sortLabel(sort)}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-[11px]">Sort by</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={() => setSort('newest')}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSort('name_asc')}>Name A→Z</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSort('price_asc')}>Price ↑</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSort('price_desc')}>Price ↓</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="hidden md:inline-flex h-8 rounded-md border border-border bg-card p-0.5">
                  <button
                    aria-label="Grid view"
                    onClick={() => setView('grid')}
                    className={cn(
                      'h-7 w-7 rounded flex items-center justify-center transition-colors focus-ring',
                      view === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    aria-label="Table view"
                    onClick={() => setView('table')}
                    className={cn(
                      'h-7 w-7 rounded flex items-center justify-center transition-colors focus-ring',
                      view === 'table' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Rows3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 text-[11.5px] text-muted-foreground tabular-nums px-0.5">
              {status === 'ready' && `${filtered.length} ${filtered.length === 1 ? 'result' : 'results'}`}
            </div>
          </motion.div>

          {/* Catalog */}
          <motion.div variants={item}>
            {status === 'loading' ? (
              <GridSkeleton />
            ) : status === 'error' ? (
              <ErrorState onRetry={() => setStatus('ready')} />
            ) : products.length === 0 ? (
              <CatalogEmpty onAdd={openAdd} onImport={() => setIsImportOpen(true)} />
            ) : filtered.length === 0 ? (
              <FilteredEmpty
                archived={statusFilter === 'archived'}
                onClear={clearFilters}
              />
            ) : view === 'grid' || typeof window === 'undefined' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    saving={savingIds.has(p.id)}
                    onToggle={() => toggleActive(p)}
                    onEdit={() => openEdit(p)}
                    onDuplicate={() => duplicate(p)}
                    onArchive={() => setArchiveTarget(p)}
                    onUnarchive={() => unarchive(p)}
                    onDelete={() => setDeleteTarget(p)}
                  />
                ))}
              </div>
            ) : (
              <ProductTable
                products={filtered}
                savingIds={savingIds}
                onToggle={toggleActive}
                onEdit={openEdit}
                onDuplicate={duplicate}
                onArchive={(p) => setArchiveTarget(p)}
                onUnarchive={unarchive}
                onDelete={(p) => setDeleteTarget(p)}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Add / Edit dialog */}
        <Dialog open={isFormOpen} onOpenChange={(o) => !saving && setIsFormOpen(o)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{formMode === 'add' ? 'Add product' : 'Edit product'}</DialogTitle>
              <DialogDescription>
                {formMode === 'add'
                  ? 'Add a product the AI can reference when replying.'
                  : 'Update product details used by the AI.'}
              </DialogDescription>
            </DialogHeader>

            {saveError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-[12.5px] px-3 py-2 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5" />
                <span>{saveError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-5 py-2">
              <div className="space-y-4">
                <Field label="Title" error={formErrors.title} required>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Linen Set — Sand"
                    maxLength={80}
                  />
                </Field>
                <Field
                  label="Description"
                  error={formErrors.description}
                  required
                  hint={`${form.description.length}/${MAX_DESC}`}
                >
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="min-h-[100px]"
                    placeholder="Short description used by the AI."
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price (USD)" error={formErrors.price} required>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </Field>
                  <Field label="Category">
                    <Input
                      list="cat-suggestions"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      placeholder="e.g. Apparel"
                    />
                    <datalist id="cat-suggestions">
                      {categories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </Field>
                </div>
                <Field label="Image URL" error={formErrors.image_url}>
                  <Input
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </Field>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-[12.5px] font-medium text-foreground">Active</p>
                    <p className="text-[11.5px] text-muted-foreground">
                      Inactive products are hidden from AI replies.
                    </p>
                  </div>
                  <Switch
                    checked={form.is_active}
                    onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                  />
                </div>
              </div>

              <div>
                <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Preview
                </Label>
                <div className="mt-1.5 aspect-square rounded-lg border border-border bg-muted overflow-hidden flex items-center justify-center">
                  <ImagePreview url={form.image_url} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="gap-2 press-scale">
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {formMode === 'add' ? 'Add product' : 'Save changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Import JSON */}
        <Dialog open={isImportOpen} onOpenChange={(o) => !importing && setIsImportOpen(o)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Import products</DialogTitle>
              <DialogDescription>Bulk add products from a JSON array.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-3 gap-3">
                <ImportSourceButton icon={<FileJson className="w-5 h-5" />} label="JSON" active />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ImportSourceButton icon={<FileSpreadsheet className="w-5 h-5" />} label="CSV" disabled />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Available after backend wiring</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ImportSourceButton icon={<ShoppingBag className="w-5 h-5" />} label="Shopify" disabled />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Available after backend wiring</TooltipContent>
                </Tooltip>
              </div>

              {importError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-[12.5px] px-3 py-2 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5" />
                  <span>{importError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <Label className="text-[12.5px]">JSON</Label>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your product JSON here..."
                  className="min-h-[180px] font-mono text-xs"
                />
              </div>
              <details className="rounded-lg bg-muted p-3">
                <summary className="text-[12.5px] font-medium cursor-pointer">Example format</summary>
                <pre className="text-[11px] text-muted-foreground overflow-x-auto mt-2">{exampleJson}</pre>
              </details>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsImportOpen(false)} disabled={importing}>
                Cancel
              </Button>
              <Button onClick={handleImport} disabled={!jsonInput.trim() || importing} className="gap-2">
                {importing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                Import
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Archive confirm */}
        <AlertDialog open={!!archiveTarget} onOpenChange={(o) => !o && setArchiveTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Archive product?</AlertDialogTitle>
              <AlertDialogDescription>
                "{archiveTarget?.title}" will be hidden from AI replies and the default catalog view.
                You can unarchive it any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (archiveTarget) archive(archiveTarget);
                  setArchiveTarget(null);
                }}
              >
                Archive
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete confirm (archived only) */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete permanently?</AlertDialogTitle>
              <AlertDialogDescription>
                "{deleteTarget?.title}" will be removed. This can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deleteTarget) remove(deleteTarget);
                  setDeleteTarget(null);
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}

/* ---------- helpers ---------- */

function sortLabel(s: Sort) {
  return s === 'newest' ? 'Newest' : s === 'name_asc' ? 'Name A→Z' : s === 'price_asc' ? 'Price ↑' : 'Price ↓';
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] transition-colors duration-200 bg-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-[13px] text-muted-foreground font-medium">{label}</p>
          <div className="p-2 rounded-lg bg-muted">{icon}</div>
        </div>
        <p className="mt-4 text-[26px] font-semibold text-foreground tabular-nums tracking-[-0.015em] leading-none">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-7 px-2.5 rounded-full text-[11.5px] font-medium border transition-colors focus-ring',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40',
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-[12.5px] font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
        {hint && <span className="text-[11px] text-muted-foreground tabular-nums">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-[11.5px] text-destructive">{error}</p>}
    </div>
  );
}

function ImagePreview({ url }: { url: string }) {
  const [err, setErr] = useState(false);
  const prev = useRef(url);
  if (prev.current !== url) {
    prev.current = url;
    if (err) setErr(false);
  }
  if (!url) {
    return <ImageIcon className="w-6 h-6 text-muted-foreground/60" strokeWidth={1.5} />;
  }
  if (err) {
    return (
      <div className="text-center px-2">
        <ImageIcon className="w-6 h-6 mx-auto text-muted-foreground/50" strokeWidth={1.5} />
        <p className="text-[10.5px] text-muted-foreground mt-1">Invalid image</p>
      </div>
    );
  }
  return (
    <img
      src={url}
      alt="Preview"
      onError={() => setErr(true)}
      className="w-full h-full object-cover"
    />
  );
}

function ImportSourceButton({
  icon,
  label,
  disabled,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'w-full h-auto py-3 rounded-lg border text-[11.5px] font-medium flex flex-col items-center gap-1.5 transition-colors',
        active
          ? 'border-foreground bg-muted text-foreground'
          : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40',
        disabled && 'opacity-50 cursor-not-allowed hover:text-muted-foreground hover:border-border',
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function ProductCard({
  product,
  saving,
  onToggle,
  onEdit,
  onDuplicate,
  onArchive,
  onUnarchive,
  onDelete,
}: {
  product: UiProduct;
  saving: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onDelete: () => void;
}) {
  const dim = !product.is_active || product.archived;
  return (
    <Card
      className={cn(
        'overflow-hidden rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 group bg-card',
        dim && 'opacity-80',
      )}
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-10 h-10 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <RowMenu
            product={product}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
            onDelete={onDelete}
          />
        </div>
        {(product.archived || !product.is_active) && (
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="h-5 px-1.5 text-[10px] font-medium rounded-md bg-background/90 text-muted-foreground border border-border/70"
            >
              {product.archived ? 'Archived' : 'Inactive'}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-[13px] line-clamp-1 text-foreground">{product.title}</h3>
            {product.category && (
              <Badge
                variant="outline"
                className="text-[10px] mt-1.5 font-medium border-border/70 text-muted-foreground uppercase tracking-wider"
              >
                {product.category}
              </Badge>
            )}
          </div>
          <p className="font-semibold text-[14px] text-foreground tabular-nums shrink-0">
            ${(product.price || 0).toFixed(2)}
          </p>
        </div>
        <p className={cn('text-[12px] line-clamp-2 mb-3 leading-relaxed', product.description ? 'text-muted-foreground' : 'text-muted-foreground/60 italic')}>
          {product.description || 'No description'}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border/60">
          <Label className="text-[12px] text-muted-foreground font-medium flex items-center gap-1.5">
            Active
            {saving && <Loader2 className="w-3 h-3 animate-spin" />}
          </Label>
          <Switch
            checked={product.is_active}
            onCheckedChange={onToggle}
            disabled={product.archived || saving}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function RowMenu({
  product,
  onEdit,
  onDuplicate,
  onArchive,
  onUnarchive,
  onDelete,
  triggerClassName,
}: {
  product: UiProduct;
  onEdit: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onDelete: () => void;
  triggerClassName?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            'h-8 w-8 shadow-[var(--shadow-sm)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity',
            triggerClassName,
          )}
          aria-label="Actions"
        >
          <MoreVertical className="w-4 h-4" strokeWidth={1.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>
          <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
        </DropdownMenuItem>
        {product.archived ? (
          <DropdownMenuItem onClick={onUnarchive}>
            <ArchiveRestore className="w-3.5 h-3.5 mr-2" /> Unarchive
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={onArchive}>
            <Archive className="w-3.5 h-3.5 mr-2" /> Archive
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled>
          <Link2 className="w-3.5 h-3.5 mr-2" /> Copy link
        </DropdownMenuItem>
        {product.archived && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProductTable({
  products,
  savingIds,
  onToggle,
  onEdit,
  onDuplicate,
  onArchive,
  onUnarchive,
  onDelete,
}: {
  products: UiProduct[];
  savingIds: Set<string>;
  onToggle: (p: UiProduct) => void;
  onEdit: (p: UiProduct) => void;
  onDuplicate: (p: UiProduct) => void;
  onArchive: (p: UiProduct) => void;
  onUnarchive: (p: UiProduct) => void;
  onDelete: (p: UiProduct) => void;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card overflow-hidden">
      <div className="grid grid-cols-[64px_1.5fr_1fr_0.6fr_0.7fr_44px] items-center gap-3 px-4 h-9 border-b border-border/60 text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
        <span></span>
        <span>Product</span>
        <span>Category</span>
        <span className="text-right">Price</span>
        <span>Status</span>
        <span></span>
      </div>
      <ul>
        {products.map((p) => (
          <li
            key={p.id}
            className="group grid grid-cols-[64px_1.5fr_1fr_0.6fr_0.7fr_44px] items-center gap-3 px-4 min-h-[56px] border-b border-border/60 last:border-b-0 hover:bg-muted/40 transition-colors"
          >
            <div className="w-11 h-11 rounded-md bg-muted overflow-hidden flex items-center justify-center">
              {p.image_url ? (
                <img src={p.image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <Package className="w-4 h-4 text-muted-foreground/60" strokeWidth={1.5} />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-foreground truncate">{p.title}</p>
              <p className="text-[11.5px] text-muted-foreground truncate">{p.description || '—'}</p>
            </div>
            <div className="text-[12px] text-muted-foreground truncate">{p.category || '—'}</div>
            <div className="text-[13px] text-foreground tabular-nums text-right">
              ${(p.price || 0).toFixed(2)}
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={p.is_active}
                onCheckedChange={() => onToggle(p)}
                disabled={p.archived || savingIds.has(p.id)}
              />
              <span className="text-[11.5px] text-muted-foreground">
                {p.archived ? 'Archived' : p.is_active ? 'Active' : 'Inactive'}
              </span>
              {savingIds.has(p.id) && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
            </div>
            <div className="flex justify-end">
              <RowMenu
                product={p}
                onEdit={() => onEdit(p)}
                onDuplicate={() => onDuplicate(p)}
                onArchive={() => onArchive(p)}
                onUnarchive={() => onUnarchive(p)}
                onDelete={() => onDelete(p)}
                triggerClassName="md:opacity-100"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden rounded-2xl border border-border/70 bg-card">
          <Skeleton variant="shimmer" className="aspect-square w-full rounded-none" />
          <CardContent className="p-4 space-y-2">
            <Skeleton variant="shimmer" className="h-3.5 w-3/4" />
            <Skeleton variant="shimmer" className="h-3 w-1/2" />
            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <Skeleton variant="shimmer" className="h-3 w-10" />
              <Skeleton variant="shimmer" className="h-4 w-8 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CatalogEmpty({ onAdd, onImport }: { onAdd: () => void; onImport: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card py-14 px-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center">
        <Package className="w-5 h-5 text-muted-foreground" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-foreground">No products yet</h3>
      <p className="mt-1 text-[13px] text-muted-foreground max-w-sm mx-auto">
        Add products so the AI can recommend and answer buyer questions accurately.
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button size="sm" className="gap-1.5" onClick={onAdd}>
          <Plus className="w-3.5 h-3.5" /> Add product
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5" onClick={onImport}>
          <FileJson className="w-3.5 h-3.5" /> Import JSON
        </Button>
      </div>
    </div>
  );
}

function FilteredEmpty({ archived, onClear }: { archived: boolean; onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card py-12 px-6 text-center">
      <div className="w-10 h-10 rounded-xl bg-muted mx-auto flex items-center justify-center">
        {archived ? (
          <Archive className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
        ) : (
          <Search className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
        )}
      </div>
      <h3 className="mt-3 text-[14px] font-semibold text-foreground">
        {archived ? 'Nothing archived' : 'No matches'}
      </h3>
      <p className="mt-1 text-[12.5px] text-muted-foreground">
        {archived
          ? 'Archived products will appear here.'
          : 'Try a different search term or clear your filters.'}
      </p>
      {!archived && (
        <Button size="sm" variant="outline" className="mt-3" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card py-12 px-6 text-center">
      <div className="w-10 h-10 rounded-xl bg-destructive/10 mx-auto flex items-center justify-center">
        <AlertCircle className="w-4 h-4 text-destructive" />
      </div>
      <h3 className="mt-3 text-[14px] font-semibold text-foreground">Couldn't load products</h3>
      <p className="mt-1 text-[12.5px] text-muted-foreground">
        Something went wrong loading your catalog.
      </p>
      <Button size="sm" variant="outline" className="mt-3 gap-1.5" onClick={onRetry}>
        <RefreshCw className="w-3.5 h-3.5" /> Retry
      </Button>
    </div>
  );
}
