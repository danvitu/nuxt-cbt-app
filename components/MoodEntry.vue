<template>
  <div class="border-b">
    <!-- <div class="text-gray-400 text-xs flex items-center gap-2">
      {{ formatDate(moodEntry.created_at) }}
    </div> -->
    <div class="grid grid-cols-5 py-2 items-center">
      <div>{{ moodEntry.anxious_sum }}</div>
      <div>{{ moodEntry.physical_sum }}</div>
      <div>{{ moodEntry.depression_sum }}</div>
      <div>{{ suicidalSum }}</div>
      <UDropdown :items="items">
        <UButton color="white" variant="ghost" icon="i-heroicons-ellipsis-horizontal" :loading="isLoading" />
        <MoodResultModal v-model:is-open="isResultModalOpen" :moodEntry="moodEntry" />
      </UDropdown>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  moodEntry: Object
})
const suicidalSum = computed(() => props.moodEntry.suicidal_1 + props.moodEntry.suicidal_2)
const emit = defineEmits(['deleted'])
const isResultModalOpen = ref(false)
const supabase = useSupabaseClient()
const { toastSuccess, toastError } = useAppToast()
const isLoading = ref(false)
const deleteEntry = async () => {
  isLoading.value = true
  try {
    const { error } = await supabase.from('mood')
      .delete()
      .eq('id', props.moodEntry.id)
    if (error) throw error
    toastSuccess({ title: 'Опрос удалён' })
    emit('deleted', props.moodEntry.id)
  } catch (e) {
    toastError({
      title: 'Опрос не был удалён',
      description: e.message
    })
  } finally {
    isLoading.value = false
  }
}

const items = [
  [
    {
      label: 'Результат',
      icon: 'i-heroicons-academic-cap',
      click: () => isResultModalOpen.value = true,
    },
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: deleteEntry
    },
  ]
]
</script>