<script setup lang="ts">
import { ref, reactive, computed } from "vue"

type StatusType = 'applied' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn'

interface JobApplication {
  id: string
  company: string
  role: string
  applicationDate: string
  jobUrl?: string
  notes?: string
  status: StatusType
}

const applications = reactive<JobApplication[]>(

  [
    {
      id: 'app-001',
      company: 'Cedar Labs',
      role: 'Frontend Developer',
      applicationDate: '2026-10-01',
      jobUrl: 'https://example.com/jobs/frontend-developer',
      notes: 'Submitted resume and portfolio.',
      status: 'applied',
    },
    {
      id: 'app-002',
      company: 'Harbor Systems',
      role: 'Senior Vue Developer',
      applicationDate: '2026-09-25',
      notes: 'Technical interview scheduled.',
      status: 'interviewing',
    },
    {
      id: 'app-003',
      company: 'Maple Studio',
      role: 'UI Engineer',
      applicationDate: '2026-09-18',
      jobUrl: 'https://example.com/jobs/ui-engineer',
      status: 'offered',
    },
]);


const searchQuery = ref('')

const status = ref<StatusType | 'all'>('all')

const filteredApplications = computed(() => {
  const normalizedSearchQuery = searchQuery.value.trim().toLowerCase()

  return applications.filter(item => {
    if (status.value === "all") return item.company.toLowerCase().includes(normalizedSearchQuery) || item.role.toLowerCase().includes(normalizedSearchQuery)

    return (item.company.toLowerCase().includes(normalizedSearchQuery) || item.role.toLowerCase().includes(normalizedSearchQuery)) && status.value === item.status
  })
})

function reset() {
  status.value = "all"
  searchQuery.value = ""
}

const totalApplicationCount = computed(() => applications.length)
const visibleApplicationCount = computed(() => filteredApplications.value.length)
const statusCounts = computed(() => {
  return {
    applied: applications.filter(item => item.status === 'applied').length,
    interviewing: applications.filter(item => item.status === 'interviewing').length,
    offered: applications.filter(item => item.status === 'offered').length,
    rejected: applications.filter(item => item.status === 'rejected').length,
    withdrawn: applications.filter(item => item.status === 'withdrawn').length,

  }
})

</script>

<template>
  <h1>Job Application Tracker</h1>
  <p>
    Job Applications:
  </p>
  <p>
      <label for="searchQuery">Filter:</label> <input id="searchQuery" v-model="searchQuery" placeholder="search the company or the role" />
  </p>

  <p>There are {{ totalApplicationCount }} in the records.</p>
  <p>
      applied = {{statusCounts.applied}},
      interviewing = {{statusCounts.interviewing}},
      offered = {{statusCounts.offered}},
      rejected = {{statusCounts.rejected}},
      withdrawn = {{statusCounts.withdrawn}}
  </p>
  <p>Showing {{ visibleApplicationCount }} of {{ totalApplicationCount }}</p>

  <p>
      <label for="statusDropdown">Status:</label>
      <select id="statusDropdown" v-model="status">
          <option value="all">all</option>
          <option value="applied">applied</option>
          <option value="interviewing">interviewing</option>
          <option value="offered">offered</option>
          <option value="rejected">rejected</option>
          <option value="withdrawn">withdrawn</option>
      </select>
  </p>

  <p><button @click="reset">Reset</button></p>
  <ul>
      <li v-for="application in filteredApplications" :key="application.id">
          <p>{{application.id}}</p>
          <ul>
              <li>{{application.company}}</li>
              <li>{{application.role}}</li>
              <li>{{application.status}}</li>
              <li>{{application.applicationDate}}</li>
              <li v-if="application.jobUrl">{{application.jobUrl}}</li>
              <li v-if="application.notes">{{application.notes}}</li>
          </ul>
      </li>
      <li v-if="filteredApplications.length === 0">
          No applications match your search
      </li>
  </ul>
</template>

<style scoped>

</style>
