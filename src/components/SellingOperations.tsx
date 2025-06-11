import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Search, Download } from "lucide-react";
interface Personnel {
  id: number;
  name: string;
  cashierNumber: string;
  pinCode: string;
  image: string;
}
interface Operation {
  id: string;
  clientName: string;
  date: string;
  time: string;
  product: string;
  barcode: string;
  quantity: number;
  stockQuantity: number;
  alertLevel: number;
  buyingPrice: number;
  sellingPrice: number;
  vat: number;
  sellingPriceWithVat: number;
  rotationStatus: string;
  score: number;
}
interface SellingOperationsProps {
  personnel: Personnel;
  onBack: () => void;
}
const SellingOperations = ({
  personnel,
  onBack
}: SellingOperationsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState('5');
  const [operations] = useState<Operation[]>([{
    id: "125478",
    clientName: "adlene yahlaoui",
    date: "13/04/2025",
    time: "",
    product: "huile-5l",
    barcode: "huile-105",
    quantity: 1,
    stockQuantity: 0,
    alertLevel: 650,
    buyingPrice: 550,
    sellingPrice: 100,
    vat: 650,
    sellingPriceWithVat: 0,
    rotationStatus: "",
    score: 0
  }]);
  const filteredOperations = operations.filter(operation => {
    const matchesSearch = operation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || operation.id.toLowerCase().includes(searchTerm.toLowerCase()) || operation.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const handleDownloadResume = () => {
    console.log('Downloading resume for', personnel.name);
  };
  return <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Previous Page
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">bonjour, {personnel.name}</h1>
          <p className="text-gray-600">Start managing your supermarket</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="search" className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="product">Product</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Operations Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0794FE] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">OPERATION NUMBER</th>
                <th className="px-4 py-3 text-left text-sm font-medium">CLIENT</th>
                <th className="px-4 py-3 text-left text-sm font-medium">DATE ET HEURE</th>
                <th className="px-4 py-3 text-left text-sm font-medium">PRODUIT</th>
                <th className="px-4 py-3 text-left text-sm font-medium">QUANTITY VENDU</th>
                <th className="px-4 py-3 text-left text-sm font-medium">QUANTITY EN STOCK</th>
                
                <th className="px-4 py-3 text-left text-sm font-medium">PRIX ACHAT</th>
                <th className="px-4 py-3 text-left text-sm font-medium">PRIX VENTE HT</th>
                <th className="px-4 py-3 text-left text-sm font-medium">TVA</th>
                <th className="px-4 py-3 text-left text-sm font-medium">PRIX VENTE TTC</th>
                
                <th className="px-4 py-3 text-left text-sm font-medium">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {filteredOperations.map(operation => <tr key={operation.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{operation.id}</td>
                  <td className="px-4 py-3 text-sm">{operation.clientName}</td>
                  <td className="px-4 py-3 text-sm">{operation.date}</td>
                  <td className="px-4 py-3 text-sm">{operation.product}</td>
                  <td className="px-4 py-3 text-sm">{operation.quantity}</td>
                  <td className="px-4 py-3 text-sm">{operation.stockQuantity}</td>
                  <td className="px-4 py-3 text-sm">{operation.alertLevel}</td>
                  <td className="px-4 py-3 text-sm">{operation.buyingPrice}</td>
                  <td className="px-4 py-3 text-sm">{operation.sellingPrice}</td>
                  <td className="px-4 py-3 text-sm">{operation.vat}</td>
                  <td className="px-4 py-3 text-sm">{operation.sellingPriceWithVat}</td>
                  <td className="px-4 py-3 text-sm">{operation.rotationStatus}</td>
                  
                </tr>)}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-600">
            Rows per page: 
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger className="w-16 ml-2 inline-flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            1-1 of 1
          </div>
        </div>
      </div>

      {/* Download Resume Button */}
      <div className="flex justify-start mt-6">
        <Button onClick={handleDownloadResume} className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download resume
        </Button>
      </div>
    </div>;
};
export default SellingOperations;