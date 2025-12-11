import client from './client'

export interface Job {
  id: number
  title: string
  description: string
  department: string
  location: string
  employment_type: string
  status: string
  created_at: string
  updated_at: string
  posted_at: string | null
  application_count: number
}

export interface JobListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Job[]
}

export const jobsApi = {
  list: (params?: any) => client.get<JobListResponse>('/jobs/', { params }),
  get: (id: number) => client.get<Job>(`/jobs/${id}/`),
  create: (data: Partial<Job>) => client.post<Job>('/jobs/', data),
  update: (id: number, data: Partial<Job>) => client.patch<Job>(`/jobs/${id}/`, data),
  delete: (id: number) => client.delete(`/jobs/${id}/`),
}
