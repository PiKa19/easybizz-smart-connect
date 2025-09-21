import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, AlertTriangle, Package, TrendingUp, TrendingDown } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  totalValue: number;
  lastRestocked: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstocked';
}

const SupplierInventorySection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const [newItem, setNewItem] = useState({
    name: '',
    sku: '',
    category: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: 0,
    supplier: ''
  });

  // Mock inventory data
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Coca-Cola 2L',
      sku: 'CC-2L-001',
      category: 'Beverages',
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      unitPrice: 150,
      totalValue: 22500,
      lastRestocked: '2024-01-10',
      supplier: 'Coca-Cola Algeria',
      status: 'In Stock'
    },
    {
      id: '2',
      name: 'Elio Oil 5L',
      sku: 'EO-5L-002',
      category: 'Oils & Fats',
      currentStock: 25,
      minStock: 30,
      maxStock: 100,
      unitPrice: 790,
      totalValue: 19750,
      lastRestocked: '2024-01-08',
      supplier: 'Elio Industries',
      status: 'Low Stock'
    },
    {
      id: '3',
      name: 'Skor Civital 2KG',
      sku: 'SC-2K-003',
      category: 'Sugar',
      currentStock: 0,
      minStock: 20,
      maxStock: 80,
      unitPrice: 290,
      totalValue: 0,
      lastRestocked: '2024-01-05',
      supplier: 'Civital',
      status: 'Out of Stock'
    },
    {
      id: '4',
      name: 'La Vache qui rit 24p',
      sku: 'LV-24P-004',
      category: 'Dairy',
      currentStock: 85,
      minStock: 40,
      maxStock: 120,
      unitPrice: 450,
      totalValue: 38250,
      lastRestocked: '2024-01-12',
      supplier: 'Fromageries Bel',
      status: 'In Stock'
    },
    {
      id: '5',
      name: 'Cheezy 24p',
      sku: 'CZ-24P-005',
      category: 'Dairy',
      currentStock: 200,
      minStock: 60,
      maxStock: 150,
      unitPrice: 390,
      totalValue: 78000,
      lastRestocked: '2024-01-15',
      supplier: 'Local Dairy Co',
      status: 'Overstocked'
    }
  ]);

  const categories = ['all', 'Beverages', 'Oils & Fats', 'Sugar', 'Dairy', 'Snacks'];
  const statuses = ['all', 'In Stock', 'Low Stock', 'Out of Stock', 'Overstocked'];

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inventory, searchTerm, selectedCategory, selectedStatus]);

  const inventoryStats = useMemo(() => {
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
    const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length;
    const outOfStockItems = inventory.filter(item => item.status === 'Out of Stock').length;
    
    return { totalItems, totalValue, lowStockItems, outOfStockItems };
  }, [inventory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Overstocked': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Low Stock': return <AlertTriangle className="w-4 h-4" />;
      case 'Out of Stock': return <AlertTriangle className="w-4 h-4" />;
      case 'Overstocked': return <TrendingUp className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleAddItem = () => {
    const item: InventoryItem = {
      id: Date.now().toString(),
      ...newItem,
      totalValue: newItem.currentStock * newItem.unitPrice,
      lastRestocked: new Date().toISOString().split('T')[0],
      status: newItem.currentStock <= newItem.minStock ? 'Low Stock' : 
              newItem.currentStock === 0 ? 'Out of Stock' :
              newItem.currentStock > newItem.maxStock ? 'Overstocked' : 'In Stock'
    };
    
    setInventory(prev => [...prev, item]);
    setNewItem({
      name: '',
      sku: '',
      category: '',
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unitPrice: 0,
      supplier: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0794FE] mb-2">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0794FE] hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newItem.sku}
                  onChange={(e) => setNewItem(prev => ({ ...prev, sku: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem(prev => ({ ...prev, currentStock: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxStock">Max Stock</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) => setNewItem(prev => ({ ...prev, maxStock: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="unitPrice">Unit Price (DZD)</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem(prev => ({ ...prev, supplier: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddItem} className="flex-1">Add Product</Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalItems}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalValue.toLocaleString()} DZD</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStockItems}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{inventoryStats.outOfStockItems}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.supplier}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.currentStock}</div>
                      <div className="text-xs text-gray-500">Min: {item.minStock} | Max: {item.maxStock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unitPrice.toLocaleString()} DZD</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalValue.toLocaleString()} DZD</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierInventorySection;