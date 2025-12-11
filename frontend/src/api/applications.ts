import client from './client'
import { Job } from './jobs'
import { Candidate } from './candidates'

export interface Note {
  id: number
  content: string
  created_at: string
  updated_at: string
}

export interface Application {
  id: number
  job: Job
  candidate: Candidate
  status: string
  cover_letter: string
  notes: string
  applied_at: string
  updated_at: string
  status_changed_at: string
  notes_count: number
}

export interface ApplicationDetail extends Application {
  application_notes: Note[]
}

export interface ApplicationListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Application[]
}

export interface ApplicationStats {
  total: number
  by_status: {
    [key: string]: {
      label: string
      count: number
      percentage: number
    }
  }
}

export const applicationsApi = {
  list: (params?: any) => client.get<ApplicationListResponse>('/applications/', { params }),
  get: (id: number) => client.get<ApplicationDetail>(`/applications/${id}/`),
  create: (data: Partial<Application>) => client.post<Application>('/applications/', data),
  update: (id: number, data: Partial<Application>) => client.patch<Application>(`/applications/${id}/`, data),
  delete: (id: number) => client.delete(`/applications/${id}/`),
  stats: () => client.get<ApplicationStats>('/applications/stats/'),
  addNote: (id: number, content: string) => client.post<Note>(`/applications/${id}/add_note/`, { content }),
}
