<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import type { JobApplication, StatusType } from "./types"
import JobApplicationList from './components/JobApplicationList.vue'
import JobApplicationForm from './components/JobApplicationForm.vue'

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

const selectedApplicationId = ref<string>()
function handleSelectedApplication(id: string) {
  selectedApplicationId.value = id
}

function handleAddJobApplication(data: JobApplication) {
  applications.push(data)
}

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

  <p>selected application id = {{selectedApplicationId}}</p>

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

  <JobApplicationForm @addJobApplication="handleAddJobApplication" />

  <JobApplicationList :applications="filteredApplications" @select="handleSelectedApplication" />
</template>

<style scoped>

</style>
