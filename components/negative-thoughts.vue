<template>
  <div class="mb-4 font-semibold">Запишите негативные мысли</div>
  <div v-for="(thought, index) in negativeThoughts" :key="index" class="mb-8">
    <div class="space-y-4">
      <UFormGroup label="Негативная мысль">
        <UTextarea v-model="thought.negativeThought" />
      </UFormGroup>
      <div class="flex space-x-4">
        <UInput v-model.number="thought.confidenceBefore" type="number" />
        <UInput v-model.number="thought.confindeceAfter" type="number" />
      </div>
      <USelectMenu v-model="thought.distortionType" multiple :options="distortionOptions" />
      <div class="flex flex-wrap gap-4">
        <div v-for="(distortion, index) in thought.distortionType" class="text-sm">
          {{ distortion }}
        </div>
      </div>
      <UFormGroup label="Позитивная мысль">
        <UTextarea v-model="thought.positiveThought" />
      </UFormGroup>
      <UInput v-model.number="thought.confidenceInPositive" type="number" />
    </div>
  </div>
  <UButton @click="addThought" class="mb-4">Добавить мысль</UButton>
</template>

<script setup>
import { distortionOptions } from '~/constants';
const negativeThoughts = defineModel('negativeThoughts')
const addThought = () => {
  negativeThoughts.value.push({
    negativeThought: '',
    confidenceBefore: 0,
    confindeceAfter: 0,
    distortionType: [],
    positiveThought: '',
    confidenceInPositive: 0
  })
}
</script>