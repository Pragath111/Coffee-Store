import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useStoreProducts, Product } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Coffee, LogOut, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';

import coffeeBg from '@/assets/hero-coffee.jpg';
import logo from '@/assets/logo.jpg';

export function AdminDashboard() {
  const { logout } = useAuth();
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory, isLoaded } = useStoreProducts();
  
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      toast.success('Category added successfully');
      setNewCategoryName('');
      setIsCategoryDialogOpen(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (file.size > 1 * 1024 * 1024) {
      toast.error(`Image "${file.name}" exceeds the 1MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setEditingProduct(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            images: [...(prev.images || []), e.target!.result as string]
          };
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setEditingProduct(prev => {
      if (!prev || !prev.images) return prev;
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleToggleActive = (product: Product, checked: boolean) => {
    updateProduct({ ...product, isActive: checked });
    if (checked) {
      toast.success('Product activated');
    } else {
      toast.error('Product deactivated');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const Swal = (await import('sweetalert2')).default;

    if (editingProduct.id) {
      // Update existing
      updateProduct(editingProduct as Product);
      toast.success('Product updated successfully');
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Product updated successfully',
        background: '#1c1917', // stone-900
        color: '#f5f5f4', // stone-100
        confirmButtonColor: '#b45309', // amber-700
      });
    } else {
      // Add new
      addProduct(editingProduct as Omit<Product, 'id'>);
      toast.success('Product added successfully');
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Product added successfully',
        background: '#1c1917', // stone-900
        color: '#f5f5f4', // stone-100
        confirmButtonColor: '#b45309', // amber-700
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    const Swal = (await import('sweetalert2')).default;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b45309', // amber-700
      cancelButtonColor: '#44403c', // stone-700
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1c1917', // stone-900
      color: '#f5f5f4', // stone-100
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        toast.success('Product deleted');
      }
    });
  };

  const openNewProductDialog = () => {
    setEditingProduct({ name: '', price: '', stock: 50, desc: '', images: [], category: 'Coffee', isActive: true, discount: '', weight: '', minOrderQty: 1, gst: '', cgst: '', nutritionalFacts: '' });
    setIsDialogOpen(true);
  };

  if (!isLoaded) return null;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative p-4 md:p-8 overflow-hidden text-stone-100">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <img src={coffeeBg} alt="Coffee Background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/80 via-stone-900/70 to-amber-950/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-md" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header section */}
        <div className="flex items-center justify-between bg-stone-900/60 backdrop-blur-xl p-6 rounded-2xl border border-stone-700/50 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(217,119,6,0.2)] border border-amber-900/30">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-serif tracking-wide text-amber-50">Coorg Coffee</h1>
              <p className="text-amber-500/90 text-sm mt-1 font-medium">Coorg Coffee Luxe Inventory</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout} className="border-stone-700 hover:bg-stone-800/50 text-stone-300 gap-2">
            <LogOut className="w-4 h-4" />
            Secure Sign Out
          </Button>
        </div>

        {/* Main Content Card */}
        <Card className="bg-stone-900/70 border-stone-700/50 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-stone-700/50">
            <div className="space-y-1">
              <CardTitle className="text-xl font-serif text-amber-50">Products Catalog</CardTitle>
              <CardDescription className="text-stone-400">View and manage all active offerings.</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-48 lg:w-64 pl-9 bg-stone-800/60 border-stone-600 text-stone-100 placeholder:text-stone-400 focus-visible:ring-amber-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsCategoryDialogOpen(true)} className="bg-amber-700 hover:bg-amber-600 text-white gap-2 transition-all">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
              <Button onClick={openNewProductDialog} className="bg-amber-700 hover:bg-amber-600 text-white gap-2 transition-all">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-stone-800/50 border-b border-stone-700/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px] text-stone-400">Image</TableHead>
                  <TableHead className="text-stone-400">Name</TableHead>
                  <TableHead className="text-stone-400">Category</TableHead>
                  <TableHead className="text-right text-stone-400">Price (₹)</TableHead>
                  <TableHead className="text-right text-stone-400">Stock</TableHead>
                  <TableHead className="text-center text-stone-400">Active</TableHead>
                  <TableHead className="text-right text-stone-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className={`hover:bg-stone-800/40 border-b border-stone-700/40 transition-colors ${!product.isActive ? 'opacity-60 grayscale' : ''}`}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-800 border border-stone-700 shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-600 text-[10px]">No img</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-zinc-200">{product.name}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-900/20 text-amber-500 border border-amber-900/30">
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium text-zinc-300">₹{product.price}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${product.stock > 10 ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900/30' : 'bg-red-900/20 text-red-400 border-red-900/30'}`}>
                        {product.stock} left
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={product.isActive} 
                        onCheckedChange={(c) => handleToggleActive(product, c)} 
                        className="mx-auto data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-red-500"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setPreviewProduct(product); setPreviewImageIndex(0); }} className="text-zinc-500 hover:text-blue-400">
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)} className="text-zinc-500 hover:text-amber-600">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-zinc-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-stone-500">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-zinc-950/95 border-zinc-800 text-zinc-100 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-amber-50">{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingProduct?.id ? 'Make changes to the product here.' : 'Enter details for the new product.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-zinc-300">Name</Label>
                  <Input
                    id="name"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-zinc-300">Category</Label>
                  <Select 
                    value={editingProduct.category || 'Coffee'} 
                    onValueChange={(val) => setEditingProduct({ ...editingProduct, category: val })}
                  >
                    <SelectTrigger className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus:ring-amber-600">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat} className="focus:bg-zinc-800 focus:text-amber-400">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="desc" className="text-zinc-300">Description</Label>
                <Textarea
                  id="desc"
                  className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                  value={editingProduct.desc || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nutritionalFacts" className="text-zinc-300">Nutritional Facts <span className="text-zinc-500 font-normal text-xs ml-1">(Optional)</span></Label>
                <Textarea
                  id="nutritionalFacts"
                  className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                  value={editingProduct.nutritionalFacts || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, nutritionalFacts: e.target.value })}
                  rows={3}
                  placeholder="e.g., Calories: 2kcal, Fat: 0g, Carbohydrates: 0.3g (per 100g)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-zinc-300">Price (₹)</Label>
                  <Input
                    id="price"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock" className="text-zinc-300">Stock left</Label>
                  <Input
                    id="stock"
                    type="number"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                    min="0"
                    value={editingProduct.stock === undefined ? '' : editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount" className="text-zinc-300">Discount (%) <span className="text-zinc-500 font-normal text-xs ml-1">(Optional)</span></Label>
                  <Input
                    id="discount"
                    type="number"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                    placeholder="e.g., 10"
                    min="0"
                    max="100"
                    value={editingProduct.discount || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight" className="text-zinc-300">Weight <span className="text-zinc-500 font-normal text-xs ml-1">(Optional)</span></Label>
                  <Input
                    id="weight"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                    placeholder="e.g., 250g"
                    value={editingProduct.weight || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minOrderQty" className="text-zinc-300">Minimum Order Quantity</Label>
                <Input
                  id="minOrderQty"
                  type="number"
                  className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600 w-full"
                  min="1"
                  value={editingProduct.minOrderQty || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, minOrderQty: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="gst" className="text-zinc-300">GST (%) <span className="text-zinc-500 font-normal text-xs ml-1">(Optional)</span></Label>
                  <Input
                    id="gst"
                    type="number"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                    placeholder="e.g., 18"
                    min="0"
                    value={editingProduct.gst || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, gst: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cgst" className="text-zinc-300">CGST (%) <span className="text-zinc-500 font-normal text-xs ml-1">(Optional)</span></Label>
                  <Input
                    id="cgst"
                    type="number"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-100 focus-visible:ring-amber-600"
                    placeholder="e.g., 9"
                    min="0"
                    value={editingProduct.cgst || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, cgst: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300">Product Images</Label>
                  <span className="text-xs text-zinc-500">{editingProduct.images?.length || 0} image(s) added</span>
                </div>
                
                {/* Image Gallery Preview */}
                {editingProduct.images && editingProduct.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {editingProduct.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden bg-zinc-100 group">
                        <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Drag and Drop Zone */}
                <div 
                  className="border-2 border-dashed border-zinc-700 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-900/80 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    // Allow dropping multiple files
                    Array.from(e.dataTransfer.files).forEach(file => {
                      if (file) handleImageUpload(file);
                    });
                  }}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    multiple
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach(file => {
                          handleImageUpload(file);
                        });
                      }
                      // Reset input so same file can be selected again if removed
                      e.target.value = '';
                    }} 
                  />
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-2">
                    <Plus className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">Click to add images or drag and drop</p>
                  <p className="text-xs text-zinc-500">You can upload multiple files</p>
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_10px_rgba(217,119,6,0.3)]">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-zinc-950/95 border-zinc-800 text-zinc-100 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-amber-50">Add New Category</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new category to organize your products.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCategory} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName" className="text-zinc-300">Category Name</Label>
              <Input
                id="categoryName"
                className="bg-zinc-900/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-600"
                placeholder="e.g., Premium Roasts"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_10px_rgba(217,119,6,0.3)]">
                Add Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Product Preview Dialog */}
      <Dialog open={!!previewProduct} onOpenChange={(open) => !open && setPreviewProduct(null)}>
        <DialogContent className="sm:max-w-[450px] bg-stone-950 border-stone-800 text-stone-100 p-0 overflow-hidden shadow-2xl">
          {previewProduct && (
            <div className="relative">
              {/* Image Header */}
              <div className="w-full h-64 bg-stone-900 relative group">
                {previewProduct.images && previewProduct.images.length > 0 ? (
                  <>
                    <img src={previewProduct.images[previewImageIndex]} alt={previewProduct.name} className="w-full h-full object-cover" />
                    
                    {/* Navigation UI for multiple images */}
                    {previewProduct.images.length > 1 && (
                      <>
                        <button 
                          onClick={() => setPreviewImageIndex(prev => prev > 0 ? prev - 1 : previewProduct.images!.length - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                        >
                          &larr;
                        </button>
                        <button 
                          onClick={() => setPreviewImageIndex(prev => prev < previewProduct.images!.length - 1 ? prev + 1 : 0)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                        >
                          &rarr;
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 px-2 py-1 rounded-full backdrop-blur-md">
                          {previewProduct.images.map((_, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setPreviewImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-colors ${previewImageIndex === idx ? 'bg-amber-500' : 'bg-white/50 hover:bg-white/80'}`} 
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-600">No Image Available</div>
                )}
                {/* Discount Badge */}
                {previewProduct.discount && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {previewProduct.discount}% OFF
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setPreviewProduct(null)} 
                  className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full z-10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-serif text-amber-50 leading-tight">{previewProduct.name}</h2>
                    <span className="text-xl font-medium text-amber-500 shrink-0 ml-4">₹{previewProduct.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700">
                      {previewProduct.category}
                    </span>
                    {previewProduct.weight && (
                      <span className="text-sm text-stone-400">{previewProduct.weight}</span>
                    )}
                  </div>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed border-b border-stone-800 pb-4">
                  {previewProduct.desc}
                </p>

                {previewProduct.nutritionalFacts && (
                  <div className="pt-2">
                    <h3 className="text-sm font-medium text-stone-400 mb-2 uppercase tracking-wider">Nutritional Facts</h3>
                    <p className="text-sm text-stone-300 bg-stone-900/50 p-3 rounded-lg border border-stone-800 whitespace-pre-wrap">
                      {previewProduct.nutritionalFacts}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-800">
                  <div className="text-sm">
                    <span className="text-stone-500">Min Order: </span>
                    <span className="font-medium text-stone-300">{previewProduct.minOrderQty || 1} units</span>
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)] w-1/2">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
