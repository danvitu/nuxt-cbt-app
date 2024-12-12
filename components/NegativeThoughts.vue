<template>
  <div class="mb-4 font-semibold">Запишите негативные мысли</div>
  <div v-for="(thought, index) in negativeThoughts" :key="index" class="mb-4 pb-8 border-b">
    <div class="space-y-4">
      <UFormGroup :label="`Негативная мысль #${index + 1}`" :name="`negativeThoughts.${index}.negativeThought`">
        <UTextarea v-model="thought.negativeThought" />
      </UFormGroup>
      <div class="flex space-x-4">
        <UFormGroup label="До (%)" :name="`negativeThoughts.${index}.confidenceBefore`">
          <UInput v-model.number="thought.confidenceBefore" type="number" class="w-20" />
        </UFormGroup>
        <UFormGroup label="После (%)" :name="`negativeThoughts.${index}.confidenceAfter`">
          <UInput v-model.number="thought.confidenceAfter" type="number" class="w-20" />
        </UFormGroup>
      </div>
      <UFormGroup :name="`negativeThoughts.${index}.distortionType`">
        <template #label>
          <div class="flex items-center">
            <div>Выберите когнитивные искажения
            </div>
            <UButton color="white" variant="ghost" label="" trailing-icon="i-heroicons-information-circle"
              @click="isDistortionsOpen = true" />
            <UModal v-model="isDistortionsOpen" prevent-close>
              <UCard>
                <template #header>
                  <div class="flex justify-between">
                    <h2 class="font-bold text-xl">Проверочный список когнитивных искажений</h2>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                      @click="isDistortionsOpen = false" />
                  </div>
                </template>
                <div class="space-y-4 max-w-xl text-sm">
                  <div v-for="distortion in distortions">
                    <div class="font-bold">{{ distortion.distortionName }}</div>
                    <div>{{ distortion.distortionDescription }}</div>
                  </div>
                </div>
              </UCard>
            </UModal>
          </div>
        </template>
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
          <template v-if="thought.distortionType.length">
            <div v-for="distortion in thought.distortionType" class="text-sm border px-2 py-1 rounded-md w-max">
              {{ distortion }}
            </div>
          </template>
          <div v-else class="text-sm">Не выбрано ни одного искажения</div>
        </div>
      </div>
      <UFormGroup label="Позитивная мысль" :name="`negativeThoughts.${index}.positiveThought`">
        <template #label>
          <div class="flex items-center">
            <div>Позитивная мысль
            </div>
            <UButton color="white" variant="ghost" label="" trailing-icon="i-heroicons-information-circle"
              @click="isTechnicsOpen = true" />
            <UModal v-model="isTechnicsOpen" prevent-close>
              <UCard>
                <template #header>
                  <div class="flex justify-between">
                    <h2 class="font-bold text-xl">40 способов справиться со страхами</h2>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                      @click="isTechnicsOpen = false" />
                  </div>
                </template>
                <div class="max-w-xl text-sm">
                  <div v-for="model in techniques" class="mb-8 space-y-4">
                    <h3 class="font-bold text-xl">{{ model.modelName }}</h3>
                    <div v-for="category in model.categories">
                      <h3 class="font-semibold">{{ category.categoryName }}</h3>
                      <div v-for="technique in category.techniques">{{ technique }}</div>
                    </div>
                  </div>
                </div>
              </UCard>
            </UModal>
          </div>
        </template>
        <UTextarea v-model="thought.positiveThought" />
      </UFormGroup>
      <UFormGroup label="Убежденность после (%)" :name="`negativeThoughts.${index}.confidenceInPositive`">
        <UInput v-model.number="thought.confidenceInPositive" type="number" class="w-20" />
      </UFormGroup>
      <div class="flex justify-end">
        <UButton @click="deleteThought(index)" color="red" variant="outline" icon="i-heroicons-trash" />
      </div>
    </div>
  </div>
  <div class="border-b mb-4">
    <UButton @click="addThought" variant="outline" icon="i-heroicons-plus-circle" class="mb-4">Добавить негативную мысль
    </UButton>
  </div>
</template>

<script setup>
import { techniques, distortions } from '~/constants';
const distortionOptions = distortions.map((distortion) => distortion.distortionName)
const isDistortionsOpen = ref(false)
const isTechnicsOpen = ref(false)
const negativeThoughts = defineModel('negativeThoughts')
const addThought = () => {
  negativeThoughts.value.push({
    negativeThought: '',
    confidenceBefore: 0,
    confidenceAfter: 0,
    distortionType: [],
    positiveThought: '',
    confidenceInPositive: 0
  })
}
const deleteThought = (index) => {
  negativeThoughts.value.splice(index, 1)
}
</script>
