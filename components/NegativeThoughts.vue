<template>
  <div class="mb-4 font-semibold">Запишите негативные мысли</div>
  <div v-for="(thought, index) in negativeThoughts" :key="index" class="mb-8 pb-8 border-b">
    <div class="space-y-4">
      <UFormGroup :label="`Негативная мысль #${index + 1}`" name="negativeThought">
        <UTextarea v-model="thought.negativeThought" />
      </UFormGroup>
      <div class="flex space-x-4">
        <UFormGroup label="До (%)">
          <UInput v-model.number="thought.confidenceBefore" type="number" class="w-20" />
        </UFormGroup>
        <UFormGroup label="После (%)">
          <UInput v-model.number="thought.confindeceAfter" type="number" class="w-20" />
        </UFormGroup>
      </div>
      <UFormGroup label="Выберите когнитивные искажения">
        <USelectMenu v-model="thought.distortionType" multiple :options="distortionOptions" class="md:w-1/2">
          <template #label>
            <span v-if="thought.distortionType.length" class="truncate">Выбрано: {{ thought.distortionType.length
              }}</span>
            <span v-else>Выберите искажения</span>
          </template>
        </USelectMenu>
      </UFormGroup>
      <div>
        <div class="mb-2">Выбранные когнитивные искажения:</div>
        <div class="space-y-2">
          <div v-for="distortion in thought.distortionType" class="text-sm border px-2 py-1 rounded-md w-max">
            {{ distortion }}
          </div>
        </div>
      </div>
      <UFormGroup label="Позитивная мысль">
        <UTextarea v-model="thought.positiveThought" />
      </UFormGroup>
      <UFormGroup label="Убежденность после (%)">
        <UInput v-model.number="thought.confidenceInPositive" type="number" class="w-20" />
      </UFormGroup>
      <div class="flex justify-end pt-4">
        <UButton @click="deleteThought(index)" color="gray">Удалить мысль</UButton>
      </div>
    </div>
  </div>
  <UButton @click="addThought" class="mb-4">Добавить новую мысль</UButton>
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
const deleteThought = (index) => {
  negativeThoughts.value.splice(index, 1)
}
</script>