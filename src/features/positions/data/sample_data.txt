// src/features/positions/data/mockData.ts

// 1. The "Schema" (This is what /api/v1/config/columns will return)
export const MOCK_COLUMN_CONFIG = [
  { field: 'priority', headerName: 'Priority', type: 'dropdown', options: ['Urgent', 'High', 'Medium', 'Low'], pinned: 'left', width: 100 },
  { field: 'type', headerName: 'Type', type: 'dropdown', options: ['Existing - Attrition', 'Existing - New Roles', 'Pipeline - New Work'], width: 180 },
  { field: 'client', headerName: 'Client', type: 'dropdown', options: ['Citibank', 'Wells Fargo', 'Chase', 'Zuci Systems', '➕ Add New Client'], width: 150 },
  { field: 'project', headerName: 'Opportunity / Project', type: 'text', width: 200 },
  { field: 'probability', headerName: 'Probability %', type: 'number', width: 120 },
  { field: 'startDate', headerName: 'Est. Start Date', type: 'date', width: 140 },
  { field: 'role', headerName: 'Role', type: 'text', width: 180 },
  { field: 'level', headerName: 'Career Level', type: 'dropdown', options: ['Junior', 'Senior', 'Lead', 'Architect'], width: 130 },
  { field: 'location', headerName: 'Location', type: 'dropdown', options: ['India', 'US', 'LatAm', 'Remote'], width: 120 },
  { field: 'skills', headerName: 'Primary Skill', type: 'text', width: 150 },
  { field: 'status', headerName: 'Status', type: 'dropdown', options: ['Open', 'Closed', 'On Hold'], cellClass: (params: any) => params.value === 'Open' ? 'text-green-600 font-bold' : 'text-gray-500', width: 110 }
];

// 2. The "Data" (This is what /api/v1/demands will return)
export const MOCK_ROW_DATA = [
  { 
    id: 1, 
    priority: 'High', 
    type: 'Existing - New Roles', 
    client: 'Citibank', 
    project: 'Cloud Migration', 
    probability: 90, 
    startDate: '2026-03-01', 
    role: 'Java Developer', 
    level: 'Senior', 
    location: 'India', 
    skills: 'Spring Boot, Kafka',
    status: 'Open'
  },
  { 
    id: 2, 
    priority: 'Urgent', 
    type: 'Existing - Attrition', 
    client: 'Wells Fargo', 
    project: 'Payment Gateway', 
    probability: 100, 
    startDate: '2026-02-15', 
    role: 'React Frontend', 
    level: 'Lead', 
    location: 'US', 
    skills: 'React, TypeScript',
    status: 'Open'
  },
  { 
    id: 3, 
    priority: 'Low', 
    type: 'Pipeline - New Work', 
    client: 'Chase', 
    project: 'AI Chatbot', 
    probability: 40, 
    startDate: '2026-05-01', 
    role: 'Data Scientist', 
    level: 'Junior', 
    location: 'Remote', 
    skills: 'Python, PyTorch',
    status: 'On Hold'
  }
];