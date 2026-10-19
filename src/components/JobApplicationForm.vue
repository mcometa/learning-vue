<script setup lang="ts">
import { ref,reactive, computed } from 'vue'
import type { JobApplication, StatusType } from '../types'

const formData = reactive<JobApplication>({
  company: "",
  role: "",
  applicationDate: "",
  status: ""
})
const errorMessage = ref<string>("")
const isFormValid = ref<boolean>(false)
const formValidationMessages = reactive<object>({
  status: "",
  company: "",
  role: "",
  applicationDate: "",
  jobUrl: "",
})

  // set the data
  const emit = defineEmits<{
    (e: 'addJobApplication', data: JobApplication): void
  }>()



const onSubmit = () => {
  Object.keys(formData).forEach(key => {
    if (typeof formData[key] === 'string') {
      formData[key] = formData[key].trim();
    }
  });

  const urlPattern = /^http:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#].*)?$/
  console.log(formData, urlPattern.test(formData.jobUrl))

  if (formData.jobUrl && !urlPattern.test(formData.jobUrl)) {
    formValidationMessages.jobUrl = 'URL must start with http:// or https://'
  } else {
    formValidationMessages.jobUrl = ''
  }

  if (formData.company === "") {
  formValidationMessages.company = 'company is required'
  } else {
  formValidationMessages.company = ''
  }

  if (formData.role === "") {
  formValidationMessages.role = 'role is required'
  } else {
  formValidationMessages.role = ''
  }

  if (formData.status === "") {
  formValidationMessages.status = 'status is required'
  } else {
  formValidationMessages.status = ''
  }

  if (formData.applicationDate === "") {
  formValidationMessages.applicationDate = 'applicationDate is required'
  } else {
  formValidationMessages.applicationDate = ''
  }



  // all the error messages are empty
  const formIsValid = Object.values(formValidationMessages).every(
    value => value === ""
  )

  if (!formIsValid) {
    console.log('form is not valid', formData)
    return;
  }

  // set application data
  emit('addJobApplication', {id: Math.floor(Math.random() * 900) + 100, ...formData})

}

const validateForm = computed(() => {
  // Regex that strictly checks for http:// or https://
  // extensions / domains like: .io .ph etc

  Object.keys(formData).every(key=> {
    console.log(key)
  })
})
</script>

<template>
Job Application Form

<form @submit.prevent="onSubmit">
    <!-- company, role, application date, status, optional job URL, and optional notes. -->
    <p>
        <input name="company" v-model.lazy="formData.company" placeholder="enter company" />
        <br />
        <p v-if="formValidationMessages.company" style="color: red">
            {{formValidationMessages.company}}
        </p>
    </p>
    <p>
        <input name="role" v-model.lazy="formData.role" placeholder="enter role" />
        <br />
        <p v-if="formValidationMessages.role" style="color: red">
            {{formValidationMessages.role}}
        </p>
    </p>
    <p>
        <input name="applicationDate" v-model.lazy="formData.applicationDate" placeholder="enter application date" type="date" />

        <br />

        <p v-if="formValidationMessages.applicationDate" style="color: red">
            {{formValidationMessages.applicationDate}}
        </p>
    </p>
    <p>
        <select name="status" id="statusDropdown" v-model.lazy="formData.status">
            <option value="applied">applied</option>
            <option value="interviewing">interviewing</option>
            <option value="offered">offered</option>
            <option value="rejected">rejected</option>
            <option value="withdrawn">withdrawn</option>
        </select>
        <br />

        <p v-if="formValidationMessages.status" style="color: red">
            {{formValidationMessages.status}}
        </p>

    </p>
    <p>
        <!-- <input v-model.lazy="formData.jobUrl" placeholder="enter job url"  type="url"/> -->
        <input
              name="jobUrl"
              v-model="formData.jobUrl"
              placeholder="http://example.com"
            />
<br />
    <p v-if="formValidationMessages.jobUrl" style="color: red">
        {{formValidationMessages.jobUrl}}
    </p>
    </p>
    <p>
        <textarea name="notes" v-model="formData.notes"></textarea>
    </p>
    <button type="submit">Submit</button>
</form>
</template>

<style scoped>
</style>
