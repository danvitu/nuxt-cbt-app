<template>
  <div class="grid grid-cols-6 border-b py-2 items-center">
    <div class="text-gray-400 text-xs md:text-sm">
      {{ new Date(moodEntry.created_at).toLocaleDateString('ru-RU', {
        year: '2-digit',
        month: '2-digit',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
const deleteEntry = async (id) => {
  try {
    await supabase.from('mood')
      .delete()
      .eq('id', id)
    emit('deleted')
  } catch (e) {
    console.log(e)
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