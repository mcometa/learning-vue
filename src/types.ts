export type StatusType = 'applied' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn'


export interface JobApplication {
  id: string
  company: string
  role: string
  applicationDate: string
  jobUrl?: string
  notes?: string
  status: StatusType
}
