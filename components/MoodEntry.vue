<template>
  <div class="grid grid-cols-6 border-b py-2 items-center">
    <div class="text-gray-400 text-sm">
      {{ new Date(moodEntry.created_at).toLocaleDateString('ru-RU', {
        year: '2-digit',
        month: '2-digit',
        day: 'numeric',
      }) }}
    </div>
    <div>{{ moodEntry.anxious_sum }}</div>
    <div>{{ moodEntry.physical_sum }}</div>
    <div>{{ moodEntry.depression_sum }}</div>
    <div>{{ moodEntry.suicidal_sum }}</div>
    <UDropdown :items="getItems(moodEntry.id)">
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
const deleteEntry = async (id) => {
  try {
    await supabase.from('mood')
      .delete()
      .eq('id', id)
    toastSuccess({ title: 'Опрос удалён' })
    emit('deleted')
  } catch (e) {
    toastError({ title: 'Опрос не был удалён', description: e.message })
  }
}
const getItems = (id) => [
  [
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: () => deleteEntry(id)
    }
  ]
]
</script>