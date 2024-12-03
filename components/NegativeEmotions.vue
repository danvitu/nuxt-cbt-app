<template>
  <div class="mb-4 font-semibold">Выберите негативные эмоции</div>
  <div v-for="(group, groupIndex) in negativeEmotions" :key="groupIndex" class="mb-4 border-b">
    <div class="flex flex-wrap gap-2 mb-4">
      <div v-for="(emotion, index) in group.emotions" :key="emotion.name" :class="{ selected: emotion.isSelected }"
        class="px-2 py-1 rounded-md cursor-pointer border" @click="toggleEmotion(groupIndex, emotion.name)">
        <div v-if="index === 0" class="font-bold text-sm md:text-base">{{ emotion.name }}</div>
        <div v-else class="text-sm md:text-base">{{ emotion.name }}</div>
      </div>
    </div>
    <div class="flex space-x-4 mb-4">
      <UFormGroup label="До (%)" class="w-20" name="confidenceBefore">
        <UInput v-model.number="group.confidenceBefore" type="number" />
      </UFormGroup>
      <UFormGroup label="После (%)" class="w-20" name="confidenceAfter">
        <UInput v-model.number="group.confidenceAfter" type="number" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup>
const negativeEmotions = defineModel('negativeEmotions')
const toggleEmotion = (groupIndex, emotionName) => {
  const emotion = negativeEmotions.value[groupIndex].emotions.find(e => e.name === emotionName)
  if (emotion) emotion.isSelected = !emotion.isSelected
}
</script>

<style>
.selected {
  @apply bg-slate-700 text-white dark:bg-slate-300 dark:text-black
}
</style>