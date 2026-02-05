import { useState } from 'react';
import { X, Save, Loader2, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded?: (newClientName: string) => void;
  onDataUpload: (data: { clients: string[]; units: string[] }) => void;
}

export const AddClientModal = ({ isOpen, onClose, onClientAdded,onDataUpload }: AddClientModalProps) => {
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('US');
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target?.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      
      const rawData: any[] = XLSX.utils.sheet_to_json(sheet);

      // Create two separate sets for distinct values
      const distinctClients = new Set<string>();
      const distinctUnits = new Set<string>();

      rawData.forEach((row) => {
        const client = row["Client Name"];
        const unit = row["Delivery Unit"];

        if (client) distinctClients.add(String(client).trim());
        if (unit) distinctUnits.add(String(unit).trim());
      });

      // Pass the object containing both arrays back to the parent
      onDataUpload({
        clients: Array.from(distinctClients),
        units: Array.from(distinctUnits),
      });
      
      onClose();
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("New Client Saved:", { clientName, location });
      setIsSubmitting(false);
      setClientName('');
      if (onClientAdded) onClientAdded(clientName);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Add New Client</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Client Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Corp"
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Primary Location</label>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white"
            >
              <option value="US">United States</option>
              <option value="India">India</option>
              <option value="UK">United Kingdom</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            
            <label className="cursor-pointer flex items-center gap-2  bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors">
          <Upload className="w-4 h-4" /> {/* Requested Icon */}
          <span>Upload File</span>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileChange}
            className="hidden" // Hide original input
          />
        </label>
           
           <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50">
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Client</>}
                </button>
          </div>
        </form>
      </div>
    </div>
  );
};