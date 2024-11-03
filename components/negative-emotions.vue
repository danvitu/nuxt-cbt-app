<template>
  <div class="mb-4 font-semibold">Выберите негативные эмоции</div>
  <div v-for="(group, groupIndex) in negativeEmotions" :key="groupIndex" class="mb-8">
    <div class="flex gap-4 mb-4">
      <UButton v-for="emotion in group.emotions" :key="emotion.name" variant="outline" color="gray"
      :class="{ selected: emotion.isSelected }" @click="toggleEmotion(groupIndex, emotion.name)">
        {{ emotion.name }}
      </UButton>
    </div>
    <div class="flex space-x-4">
      <UFormGroup label="Уверенность до (%)">
        <UInput v-model.number="group.confidenceBefore" type="number" :min="0" :max="100" />
      </UFormGroup>
      <UFormGroup label="Уверенность после (%)">
        <UInput v-model.number="group.confidenceAfter" type="number" :min="0" :max="100" placeholder="Уверенность до" />
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
  @apply bg-red-200
}
</style>