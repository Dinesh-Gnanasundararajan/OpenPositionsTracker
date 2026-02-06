// src/features/positions/data/mockData.ts

// 1. The "Schema" (This is what /api/v1/config/columns will return)
export const MOCK_COLUMN_CONFIG = [
  { field: 'priority', headerName: 'Priority', width: 110, type: 'dropdown', options: ['Urgent', 'High', 'Medium', 'Low'], cellClass: (params: any) => {
      switch (params.value) {
        case 'Urgent': return 'text-red-700 font-bold bg-red-100 rounded-md px-2 py-0.5 inline-block';
        case 'High': return 'text-orange-700 font-semibold bg-orange-100 rounded-md px-2 py-0.5 inline-block';
        case 'Medium': return 'text-blue-700 bg-blue-100 rounded-md px-2 py-0.5 inline-block';
        default: return 'text-gray-600 bg-gray-100 rounded-md px-2 py-0.5 inline-block';
      }
  }},
  { field: 'type', headerName: 'Type', width: 180, type: 'dropdown', options: [
      'Existing - Attrition', 'Existing - New Roles', 
      'Closed Won - New Work', 'Closed Won - Extension', 
      'Pipeline - New Work', 'Pipeline - Extensions', 
      'Prospective Demand'
  ]},
  { field: 'client', headerName: 'Client', width: 150, type: 'text', options: ['Citibank', 'Wells Fargo', 'Chase', 'Acme Corp', 'Google', 'Amazon', 'Facebook', 'Netflix', '➕ Add New Client'] },
  { field: 'opportunity', headerName: 'Opportunity/Project', width: 200, type: 'text' },
  { field: 'probability', headerName: 'Probability - %', width: 130, type: 'number' },
  { field: 'estStartDate', headerName: 'Estimated Start Date', width: 160, type: 'date' },
  { field: 'estEndDate', headerName: 'Estimated End Date', width: 160, type: 'date' },
  { field: 'serviceLine', headerName: 'Service Line', width: 150, type: 'dropdown', options: ['App Dev', 'Data', 'Cloud', 'QA', 'Management'] },
  { field: 'practice', headerName: 'Practice', width: 150, type: 'dropdown', options: ['Banking', 'Healthcare', 'Retail', 'Auto'] },
  // 👇 NEW: Delivery Unit
  { field: 'deliveryUnit', headerName: 'Delivery Unit', width: 150, type: 'dropdown', options: ['ADM', 'CIS', 'Data', 'Digital', 'Oracle'] },
  // 👇 RENAMED: Role (Job Title)
  { field: 'role', headerName: 'Role', width: 180, type: 'text' }, 
  { field: 'careerLevel', headerName: 'Career Level (Sr, Jr, Lead)', width: 180, type: 'dropdown', options: ['Sr', 'Jr', 'Lead', 'Principal', 'Manager'] },
  { field: 'location', headerName: 'Location', width: 120, type: 'dropdown', options: ['US', 'India', 'LatAm', 'Remote'] },
  { field: 'skill', headerName: 'Skill', width: 180, type: 'text' }, 
  { field: 'fulfillment', headerName: 'Fulfillment', width: 130, type: 'dropdown', options: ['Internal', 'External'] },
  { field: 'status', headerName: 'Status', width: 110, type: 'dropdown', options: ['Open', 'Closed', 'On Hold'], cellClass: (params: any) => params.value === 'Open' ? 'text-green-600 font-medium' : 'text-gray-500' },
  { field: 'externalReqId', headerName: 'External Req in System', width: 180, type: 'text' },
  // 👇 NEW: Create Date
  { field: 'createDate', headerName: 'Create Date', width: 140, type: 'date' },
  { field: 'notes', headerName: 'Notes', width: 250, type: 'text' }
];

// Helper for Create Date
const todayStr = new Date().toISOString().split('T')[0];

// 2. The "Data" (This is what /api/v1/demands will return)
// src/features/positions/data/mockData.ts
export const MOCK_ROW_DATA = [
  {
    id: 1,
    priority: "Urgent",
    type: "Existing - Attrition",
    client: "Citibank",
    opportunity: "Cloud Migration Phase 2",
    probability: 100,
    estStartDate: "2026-03-01",
    estEndDate: "2026-12-31",
    serviceLine: "App Dev",
    practice: "Banking",
    deliveryUnit: "Digital", // NEW
    role: "Java Developer",  // NEW
    careerLevel: "Sr",
    location: "India",
    skill: "Java, Spring Boot",
    fulfillment: "Internal",
    status: "Open",
    externalReqId: "REQ-2024-001",
    createDate: "2026-01-15", // NEW
    notes: "Replacement for Amit K."
  },
  {
    id: 2,
    priority: "High",
    type: "Closed Won - New Work",
    client: "Wells Fargo",
    opportunity: "Payment Gateway Modernization",
    probability: 100,
    estStartDate: "2026-02-15",
    estEndDate: "2026-08-30",
    serviceLine: "App Dev",
    practice: "Banking",
    deliveryUnit: "ADM",
    role: "React Lead",
    careerLevel: "Lead",
    location: "US",
    skill: "React, Node.js",
    fulfillment: "External",
    status: "Open",
    externalReqId: "REQ-WF-992",
    createDate: "2026-01-20",
    notes: "Client requested onshore lead"
  },
  {
    id: 3,
    priority: "Medium",
    type: "Pipeline - New Work",
    client: "Chase",
    opportunity: "AI Customer Support Bot",
    probability: 60,
    estStartDate: "2026-04-01",
    estEndDate: "2026-10-01",
    serviceLine: "Data",
    practice: "Banking",
    deliveryUnit: "Data",
    role: "Data Scientist",
    careerLevel: "Jr",
    location: "Remote",
    skill: "Python, PyTorch",
    fulfillment: "Internal",
    status: "On Hold",
    externalReqId: "",
    createDate: "2026-02-01",
    notes: "Waiting for SOW signature"
  },
  // ... (You can duplicate these rows to create more data, 
  // keeping the structure identical for the 19 columns)
];