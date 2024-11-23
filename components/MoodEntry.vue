<template>
  <div class="grid grid-cols-6 border-b py-2 items-center">
    <div class="text-gray-400 text-sm">
      {{ formatDate(moodEntry.created_at) }}
    </div>
    <div>{{ moodEntry.anxious_sum }}</div>
    <div>{{ moodEntry.physical_sum }}</div>
    <div>{{ moodEntry.depression_sum }}</div>
    <div>{{ moodEntry.suicidal_sum }}</div>
    <UDropdown :items="items">
      <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal" />
    </UDropdown>
  </div>
</template>

<script setup>
const props = defineProps({
  moodEntry: Object
})
const emit = defineEmits(['deleted'])
const supabase = useSupabaseClient()
const { toastSuccess, toastError } = useAppToast()
const deleteEntry = async () => {
  try {
    await supabase.from('mood')
      .delete()
      .eq('id', props.moodEntry.id)
    toastSuccess({ title: 'Опрос удалён' })
    emit('deleted', props.moodEntry.id)
  } catch (e) {
    toastError({ title: 'Опрос не был удалён', description: e.message })
  }
}
const items = [
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: deleteEntry
    }
  ]
]
</script>