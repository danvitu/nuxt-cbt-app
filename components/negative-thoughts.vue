<template>
  <div class="flex flex-col gap-4 border p-4">
    <UFormGroup label="Негативная мысль">
      <UInput />
    </UFormGroup>
    <div class="flex space-x-4">
      <UFormGroup label="% До">
        <UInput type="number" class="w-16" />
      </UFormGroup>
      <UFormGroup label="% После">
        <UInput type="number" class="w-16" />
      </UFormGroup>
      <UFormGroup label="Искажение" class="flex-1">
        <USelectMenu v-model="selectedDistortions" :options="distortions" multiple placeholder="Выберите искажение" />
      </UFormGroup>
    </div>
    <div class="flex gap-4">
      <UFormGroup label="Позитивная мысль" class="flex-1">
        <UInput />
      </UFormGroup>
      <UFormGroup label="% Убежденности">
        <UInput type="number" class="w-16" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup>
import { distortions } from '~/constants';
const selectedDistortions = ref([])
</script>