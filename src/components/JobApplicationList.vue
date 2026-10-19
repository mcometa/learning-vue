<script setup lang="ts">
import type { JobApplication }  from "../types"

defineProps<{
  applications: JobApplication[]
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

function hanndleSelectedCompany(id: string) {
  emit("select", id)
}

</script>
<template>
<ul>
    <li v-for="application in applications" :key="application.id">
        <p>{{application.id}}</p>
        <ul>
            <li><button @click="hanndleSelectedCompany(application.id)">Select {{application.company}}</button></li>
            <li>{{application.role}}</li>
            <li>{{application.status}}</li>
            <li>{{application.applicationDate}}</li>
            <li v-if="application.jobUrl">{{application.jobUrl}}</li>
            <li v-if="application.notes">{{application.notes}}</li>
        </ul>
    </li>
    <li v-if="applications.length === 0">
        No applications match your search
    </li>
</ul>

</template>
<style scoped>

</style>
