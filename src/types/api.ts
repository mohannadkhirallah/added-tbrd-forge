// API Type Definitions

export interface Case {
  case_id: string;
  name: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface Document {
  document_id: string;
  case_id: string;
  filename: string;
  file_size: number;
  uploaded_at: string;
  ingested: boolean;
}

export interface PipelineStatus {
  case_id: string;
  status: 'idle' | 'queued' | 'running' | 'completed' | 'failed';
  current_step: 'analysis' | 'sections' | 'generation' | null;
  progress: number;
  started_at?: string;
  completed_at?: string;
  error?: string;
}

export interface Section {
  section_item_id: string;
  section_key: string;
  title: string;
  guidance?: string;
  content: string;
  order: number;
  locked: boolean;
}

export interface TBRDContent {
  sections: Section[];
  full_html?: string;
}

export interface SearchResult {
  chunk_id: string;
  section_key: string;
  content: string;
  relevance_score: number;
}

export interface ConversationMessage {
  message_id: string;
  case_id: string;
  sender: 'user' | 'agent';
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface KPIData {
  total_cases: number;
  brds_uploaded: number;
  tbrds_generated: number;
  success_rate: number;
  avg_generation_duration: number;
}

export interface ActivityItem {
  id: string;
  case_name: string;
  action: string;
  timestamp: string;
  user?: string;
}

export interface CaseStats {
  date: string;
  count: number;
}

export interface PipelineStats {
  status: string;
  count: number;
}
