<template>
  <div class="grid grid-cols-6 border-b py-2 items-center">
    <div class="text-gray-400 text-sm">
      {{ new Date(moodEntry.created_at).toLocaleDateString('ru-RU', {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) }}</div>
    <div>{{ moodEntry.anxious_sum }}</div>
    <div>{{ moodEntry.physical_sum }}</div>
    <div>{{ moodEntry.depression_sum }}</div>
    <div>{{ moodEntry.suicidal_sum }}</div>
    <UDropdown :items="items">
      <UButton color="white" trailing-icon="i-heroicons-ellipsis-horizontal" />
    </UDropdown>
  </div>
</template>

<script setup>
const props = defineProps({
  moodEntry: Object
})
const emit = defineEmits(['deleted'])

const supabase = useSupabaseClient()

const deleteEntry = async () => {
  try {
    await supabase.from('mood')
      .delete()
      .eq('id', props.moodEntry.id)
    emit('deleted', props.moodEntry.id)
  } catch (e) {
    console.log(e)
  } finally {
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