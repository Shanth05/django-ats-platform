import client from './client'

export interface Tag {
  id: number
  name: string
  color: string
}

export interface Candidate {
  id: number
  first_name: string
  last_name: string
  full_name: string
  email: string
  phone: string
  linkedin_url: string
  portfolio_url: string
  resume: string | null
  resume_url: string | null
  notes: string
  tags: Tag[]
  created_at: string
  updated_at: string
  application_count: number
}

export interface CandidateListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Candidate[]
}

export const candidatesApi = {
  list: (params?: any) => client.get<CandidateListResponse>('/candidates/', { params }),
  get: (id: number) => client.get<Candidate>(`/candidates/${id}/`),
  create: (data: Partial<Candidate>) => client.post<Candidate>('/candidates/', data),
  update: (id: number, data: Partial<Candidate>) => client.patch<Candidate>(`/candidates/${id}/`, data),
  delete: (id: number) => client.delete(`/candidates/${id}/`),
}
