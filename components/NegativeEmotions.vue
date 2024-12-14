<template>
  <div class="mb-4 font-semibold">Выберите и оцените негативные эмоции</div>
  <div v-for="(group, groupIndex) in negativeEmotions" :key="groupIndex" class="mb-4 border-b">
    <div class="flex flex-wrap gap-2 mb-4">
      <div v-for="(emotion, index) in group.emotions" :key="emotion.name" :class="{ selected: emotion.isSelected }"
        class="px-2 py-1 rounded-md cursor-pointer border" @click="toggleEmotion(groupIndex, emotion.name)">
        <div v-if="index === 0" class="font-bold text-sm md:text-base">{{ emotion.name }}</div>
        <div v-else class="text-sm md:text-base">{{ emotion.name }}</div>
      </div>
    </div>
    <div class="flex gap-4 mb-4">
      <UFormGroup label="До (%)" :name="`negativeEmotions.${groupIndex}.confidenceBefore`" class="w-24">
        <UInput v-model.number="group.confidenceBefore" type="number" />
      </UFormGroup>
      <UFormGroup label="После (%)" :name="`negativeEmotions.${groupIndex}.confidenceAfter`" class="w-24">
        <UInput v-model.number="group.confidenceAfter" type="number" />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup>
const negativeEmotions = defineModel('negativeEmotions', { type: Array })
const toggleEmotion = (groupIndex, emotionName) => {
  const emotion = negativeEmotions.value[groupIndex].emotions.find(e => e.name === emotionName)
  if (emotion) emotion.isSelected = !emotion.isSelected
}
</script>

<style scoped>
.selected {
  @apply bg-slate-700 text-white dark:bg-slate-300 dark:text-black
}
</style>