import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { api } from '@/lib/api';
import type { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [jsonInput, setJsonInput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts();
        setProducts(Array.isArray(data) ? data : data?.data || []);
      } catch {
        setProducts([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeProducts = products.filter((p) => p.is_active).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);

  const handleToggleActive = (productId: string) => {
    setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, is_active: !p.is_active } : p));
  };

  const handleEditProduct = (product: Product) => { setSelectedProduct(product); setIsEditOpen(true); };
  const handleDeleteProduct = (product: Product) => { setSelectedProduct(product); setIsDeleteOpen(true); };

  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      toast({ title: 'Product deleted', description: `${selectedProduct.title} has been removed.` });
    }
    setIsDeleteOpen(false);
    setSelectedProduct(null);
  };

  const handleJsonUpload = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const newProducts = Array.isArray(parsed) ? parsed : [parsed];
      const result = await api.createProduct(newProducts);
      // Refresh products list
      const data = await api.getProducts();
      setProducts(Array.isArray(data) ? data : data?.data || []);
      setJsonInput('');
      setIsUploadOpen(false);
      toast({ title: 'Products uploaded', description: `Products have been added.` });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Upload failed', description: error.message || 'Please check your JSON format and try again.' });
    }
  };

  const exampleJson = `[
  {
    "title": "Product Name",
    "description": "Product description",
    "price": 29.99,
    "image_url": "https://example.com/image.jpg",
    "category": "Category"
  }
]`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-[1400px] mx-auto w-full">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] md:text-[28px] font-semibold tracking-tight md:tracking-[-0.02em] leading-tight text-foreground">Products</h1>
            <p className="text-muted-foreground mt-1.5 text-[14px]">Manage your product catalog for AI-powered responses.</p>
          </div>
          <Button size="sm" className="h-9 gap-2" onClick={() => setIsUploadOpen(true)}><Plus className="w-4 h-4" strokeWidth={1.75} />Add Products</Button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-border transition-all duration-300 bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between"><p className="text-[13px] text-muted-foreground font-medium">Total Products</p><div className="p-2 rounded-lg bg-muted"><Package className="w-4 h-4 text-muted-foreground" strokeWidth={1.75} /></div></div>
                <p className="mt-4 text-[28px] font-semibold text-foreground tabular-nums tracking-[-0.02em] leading-none">{products.length}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-border transition-all duration-300 bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between"><p className="text-[13px] text-muted-foreground font-medium">Active Products</p><div className="p-2 rounded-lg bg-success/10"><ShoppingBag className="w-4 h-4 text-success" strokeWidth={1.75} /></div></div>
                <p className="mt-4 text-[28px] font-semibold text-foreground tabular-nums tracking-[-0.02em] leading-none">{activeProducts}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-border transition-all duration-300 bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between"><p className="text-[13px] text-muted-foreground font-medium">Catalog Value</p><div className="p-2 rounded-lg bg-info/10"><span className="text-info text-[13px] font-semibold w-4 h-4 flex items-center justify-center">$</span></div></div>
                <p className="mt-4 text-[28px] font-semibold text-foreground tabular-nums tracking-[-0.02em] leading-none">${totalValue.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div variants={item} className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.75} />
          <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 text-[13px]" />
        </motion.div>


        {/* Products Grid */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden rounded-2xl border border-border/70 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-border transition-all duration-300 group bg-card">
              <div className="aspect-square relative overflow-hidden bg-muted">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Package className="w-10 h-10 text-muted-foreground/40" strokeWidth={1.5} /></div>
                )}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="secondary" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shadow-[var(--shadow-sm)]"><MoreVertical className="w-4 h-4" strokeWidth={1.75} /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditProduct(product)}><Edit2 className="w-4 h-4 mr-2" strokeWidth={1.75} />Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteProduct(product)} className="text-destructive focus:text-destructive"><Trash2 className="w-4 h-4 mr-2" strokeWidth={1.75} />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {!product.is_active && <div className="absolute inset-0 bg-background/60 flex items-center justify-center"><Badge variant="secondary" className="bg-background text-muted-foreground border border-border">Inactive</Badge></div>}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[13px] line-clamp-1 text-foreground">{product.title}</h3>
                    {product.category && <Badge variant="outline" className="text-[10px] mt-1.5 font-medium border-border/70 text-muted-foreground uppercase tracking-wider">{product.category}</Badge>}
                  </div>
                  <p className="font-semibold text-[14px] text-foreground tabular-nums shrink-0">${(product.price || 0).toFixed(2)}</p>
                </div>
                <p className="text-[12px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border/60">
                  <Label htmlFor={`active-${product.id}`} className="text-[12px] text-muted-foreground font-medium">Active</Label>
                  <Switch id={`active-${product.id}`} checked={product.is_active} onCheckedChange={() => handleToggleActive(product.id)} />
                </div>
              </CardContent>
            </Card>
          ))}

        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div variants={item} className="text-center py-12">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">{searchQuery ? 'Try a different search term' : 'Add your first product to get started'}</p>
            <Button onClick={() => setIsUploadOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Products</Button>
          </motion.div>
        )}
      </motion.div>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Products</DialogTitle>
            <DialogDescription>Add products to your catalog for AI-powered responses</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" disabled><FileJson className="w-6 h-6" /><span className="text-xs">JSON Import</span></Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" disabled><FileSpreadsheet className="w-6 h-6" /><span className="text-xs">CSV Import</span></Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" disabled><ShoppingBag className="w-6 h-6" /><span className="text-xs">Sync Shopify</span></Button>
            </div>
            <div className="space-y-2">
              <Label>JSON Product Data</Label>
              <Textarea placeholder="Paste your product JSON here..." value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} className="min-h-[200px] font-mono text-sm" />
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium mb-2">Example JSON format:</p>
              <pre className="text-xs text-muted-foreground overflow-x-auto">{exampleJson}</pre>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
            <Button onClick={handleJsonUpload} disabled={!jsonInput.trim()}><Upload className="w-4 h-4 mr-2" />Upload Products</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="space-y-2"><Label>Title</Label><Input defaultValue={selectedProduct.title} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea defaultValue={selectedProduct.description} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Price</Label><Input type="number" defaultValue={selectedProduct.price} /></div>
                <div className="space-y-2"><Label>Category</Label><Input defaultValue={selectedProduct.category} /></div>
              </div>
              <div className="space-y-2"><Label>Image URL</Label><Input defaultValue={selectedProduct.image_url} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete "{selectedProduct?.title}"? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
