import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LanguageContext } from "@/contexts/LanguageContext";
import { toast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

interface InventoryFormData {
  product: string;
  ref: string;
  codebar: string;
  fabricationDate: string;
  perimationDate: string;
  prixHT: string;
  tva: string;
  status: string;
  alertQty: string;
  alertDate: string;
  supplier: string;
}

interface AddInventoryItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryFormData) => void;
}

const AddInventoryItemDialog: React.FC<AddInventoryItemDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useContext(LanguageContext);
  
  const [formData, setFormData] = useState<InventoryFormData>({
    product: "",
    ref: "",
    codebar: "",
    fabricationDate: "",
    perimationDate: "",
    prixHT: "",
    tva: "",
    status: "Disponible",
    alertQty: "",
    alertDate: "",
    supplier: ""
  });

  const handleInputChange = (field: keyof InventoryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.product || !formData.ref || !formData.prixHT || !formData.supplier) {
      toast({
        title: t("error") || "Error",
        description: t("fill_required_fields") || "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    
    // Reset form
    setFormData({
      product: "",
      ref: "",
      codebar: "",
      fabricationDate: "",
      perimationDate: "",
      prixHT: "",
      tva: "",
      status: "Disponible",
      alertQty: "",
      alertDate: "",
      supplier: ""
    });
    
    onClose();
    
    toast({
      title: t("success") || "Success",
      description: t("product_added_successfully") || "Product added successfully to inventory",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#0794FE] flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {t("add_new_product") || "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product" className="text-sm font-medium">
                {t("product_name") || "Product Name"} *
              </Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => handleInputChange("product", e.target.value)}
                placeholder={t("enter_product_name") || "Enter product name"}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="ref" className="text-sm font-medium">
                {t("reference") || "Reference"} *
              </Label>
              <Input
                id="ref"
                value={formData.ref}
                onChange={(e) => handleInputChange("ref", e.target.value)}
                placeholder={t("enter_reference") || "Enter reference"}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="codebar" className="text-sm font-medium">
                {t("barcode") || "Barcode"}
              </Label>
              <Input
                id="codebar"
                value={formData.codebar}
                onChange={(e) => handleInputChange("codebar", e.target.value)}
                placeholder={t("enter_barcode") || "Enter barcode"}
              />
            </div>
            
            <div>
              <Label htmlFor="supplier" className="text-sm font-medium">
                {t("supplier") || "Supplier"} *
              </Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleInputChange("supplier", e.target.value)}
                placeholder={t("enter_supplier") || "Enter supplier"}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="fabricationDate" className="text-sm font-medium">
                {t("fabrication_date") || "Fabrication Date"}
              </Label>
              <Input
                id="fabricationDate"
                type="date"
                value={formData.fabricationDate}
                onChange={(e) => handleInputChange("fabricationDate", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="perimationDate" className="text-sm font-medium">
                {t("expiration_date") || "Expiration Date"}
              </Label>
              <Input
                id="perimationDate"
                type="date"
                value={formData.perimationDate}
                onChange={(e) => handleInputChange("perimationDate", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="prixHT" className="text-sm font-medium">
                {t("price_ht") || "Price HT"} (DZD) *
              </Label>
              <Input
                id="prixHT"
                type="number"
                step="0.01"
                value={formData.prixHT}
                onChange={(e) => handleInputChange("prixHT", e.target.value)}
                placeholder={t("enter_price") || "Enter price"}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="tva" className="text-sm font-medium">
                {t("tva") || "TVA"} (%)
              </Label>
              <Input
                id="tva"
                type="number"
                value={formData.tva}
                onChange={(e) => handleInputChange("tva", e.target.value)}
                placeholder={t("enter_tva") || "Enter TVA percentage"}
              />
            </div>
            
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                {t("status") || "Status"}
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">{t("available") || "Available"}</SelectItem>
                  <SelectItem value="Endommagé">{t("damaged") || "Damaged"}</SelectItem>
                  <SelectItem value="Épuisé">{t("out_of_stock") || "Out of Stock"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="alertQty" className="text-sm font-medium">
                {t("alert_quantity") || "Alert Quantity"}
              </Label>
              <Input
                id="alertQty"
                type="number"
                value={formData.alertQty}
                onChange={(e) => handleInputChange("alertQty", e.target.value)}
                placeholder={t("enter_alert_quantity") || "Enter alert quantity"}
              />
            </div>
            
            <div>
              <Label htmlFor="alertDate" className="text-sm font-medium">
                {t("alert_date") || "Alert Date"}
              </Label>
              <Input
                id="alertDate"
                type="date"
                value={formData.alertDate}
                onChange={(e) => handleInputChange("alertDate", e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel") || "Cancel"}
            </Button>
            <Button type="submit" className="bg-[#16c784] hover:bg-[#149a69] text-white">
              {t("add_product") || "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryItemDialog;