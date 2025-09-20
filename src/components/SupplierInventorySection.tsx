import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, AlertTriangle, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { supplierSpaceApi } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

interface InventoryItem {
  id: number;
  product_id: number;
  product_name?: string;
  category_id?: number;
  purchased_quantity?: number;
  sold_quantity?: number;
  returned_quantity?: number;
  damaged_quantity?: number;
  current_quantity?: number;
  unit_price?: number;
  total_cost?: number;
  status: boolean;
  created_at?: string;
  updated_at?: string;
}

const SupplierInventorySection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [newItem, setNewItem] = useState({
    product_id: 0,
    product_name: '',
    category_id: 1,
    purchased_quantity: 0,
    sold_quantity: 0,
    returned_quantity: 0,
    damaged_quantity: 0,
    current_quantity: 0,
    unit_price: 0,
    total_cost: 0,
    status: true
  });

  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Fetch inventory data on mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await supplierSpaceApi.inventory.getAll();
        
        // Transform API data to component interface
        const transformedData: InventoryItem[] = data.map(apiItem => ({
          id: apiItem.id || 0,
          product_id: apiItem.product_id || 0,
          product_name: apiItem.product_name,
          category_id: apiItem.category_id,
          purchased_quantity: apiItem.purchased_quantity,
          sold_quantity: apiItem.sold_quantity,
          returned_quantity: apiItem.returned_quantity,
          damaged_quantity: apiItem.damaged_quantity,
          current_quantity: apiItem.current_quantity,
          unit_price: apiItem.unit_price_ht, // Note: API uses unit_price_ht
          total_cost: apiItem.total_cost,
          status: true, // Default status since API doesn't provide this field
          created_at: apiItem.created_at,
          updated_at: apiItem.updated_at
        }));
        
        setInventory(transformedData);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
        toast({
          title: "Error",
          description: "Failed to load inventory data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const categories = ['all', 'Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  const statuses = ['all', 'Active', 'Inactive'];

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = (item.product_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.product_id.toString().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || `Category ${item.category_id}` === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || 
                           (selectedStatus === 'Active' && item.status) ||
                           (selectedStatus === 'Inactive' && !item.status);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inventory, searchTerm, selectedCategory, selectedStatus]);

  const inventoryStats = useMemo(() => {
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.total_cost || 0), 0);
    const lowStockItems = inventory.filter(item => (item.current_quantity || 0) < 10).length;
    const outOfStockItems = inventory.filter(item => (item.current_quantity || 0) === 0).length;
    
    return { totalItems, totalValue, lowStockItems, outOfStockItems };
  }, [inventory]);

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (status: boolean) => {
    return status ? <Package className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />;
  };

  const handleAddItem = async () => {
    try {
      const apiResponse = await supplierSpaceApi.inventory.create(newItem);
      
      // Transform API response to component interface
      const transformedItem: InventoryItem = {
        id: apiResponse.id || 0,
        product_id: apiResponse.product_id || 0,
        product_name: apiResponse.product_name,
        category_id: apiResponse.category_id,
        purchased_quantity: apiResponse.purchased_quantity,
        sold_quantity: apiResponse.sold_quantity,
        returned_quantity: apiResponse.returned_quantity,
        damaged_quantity: apiResponse.damaged_quantity,
        current_quantity: apiResponse.current_quantity,
        unit_price: apiResponse.unit_price_ht,
        total_cost: apiResponse.total_cost,
        status: true, // Default since API doesn't provide this
        created_at: apiResponse.created_at,
        updated_at: apiResponse.updated_at
      };
      
      setInventory(prev => [...prev, transformedItem]);
      setNewItem({
        product_id: 0,
        product_name: '',
        category_id: 1,
        purchased_quantity: 0,
        sold_quantity: 0,
        returned_quantity: 0,
        damaged_quantity: 0,
        current_quantity: 0,
        unit_price: 0,
        total_cost: 0,
        status: true
      });
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Product added to inventory successfully.",
      });
    } catch (error) {
      console.error('Failed to add item:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await supplierSpaceApi.inventory.delete(id);
      setInventory(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
    }
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
                <Label htmlFor="product_name">Product Name</Label>
                <Input
                  id="product_name"
                  value={newItem.product_name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, product_name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="product_id">Product ID</Label>
                <Input
                  id="product_id"
                  type="number"
                  value={newItem.product_id}
                  onChange={(e) => setNewItem(prev => ({ ...prev, product_id: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="category_id">Category ID</Label>
                <Input
                  id="category_id"
                  type="number"
                  value={newItem.category_id}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category_id: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="current_quantity">Current Stock</Label>
                  <Input
                    id="current_quantity"
                    type="number"
                    value={newItem.current_quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, current_quantity: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="purchased_quantity">Purchased</Label>
                  <Input
                    id="purchased_quantity"
                    type="number"
                    value={newItem.purchased_quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, purchased_quantity: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="unit_price">Unit Price (DZD)</Label>
                <Input
                  id="unit_price"
                  type="number"
                  value={newItem.unit_price}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unit_price: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="total_cost">Total Cost (DZD)</Label>
                <Input
                  id="total_cost"
                  type="number"
                  value={newItem.total_cost}
                  onChange={(e) => setNewItem(prev => ({ ...prev, total_cost: parseInt(e.target.value) || 0 }))}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.product_name || 'Unknown Product'}</div>
                        <div className="text-xs text-gray-500">ID: {item.product_id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Category {item.category_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.current_quantity || 0}</div>
                      <div className="text-xs text-gray-500">
                        Purchased: {item.purchased_quantity || 0} | Sold: {item.sold_quantity || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(item.unit_price || 0).toLocaleString()} DZD</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(item.total_cost || 0).toLocaleString()} DZD</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                        {getStatusIcon(item.status)}
                        {item.status ? 'Active' : 'Inactive'}
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