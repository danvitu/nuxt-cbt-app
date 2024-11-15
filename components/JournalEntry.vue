<template>
  <div class="grid grid-cols-6 border-b py-2 items-center">
    <div class="text-gray-400 text-xs md:text-sm">
      {{ new Date(journalEntry.created_at).toLocaleDateString('ru-RU', {
        year: '2-digit',
        month: '2-digit',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) }}
    </div>
    <div class="col-span-4">{{ journalEntry.upsettingEvent }}</div>
    <UDropdown :items="items">
      <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal" />
    </UDropdown>
  </div>
</template>
<script setup>
const props = defineProps({
  journalEntry: Object
})
const emit = defineEmits(['deleted'])
const supabase = useSupabaseClient()

const deleteJournalEntry = async () => {
  try {
    await supabase.from('journal')
      .delete()
      .eq('id', props.journalEntry.id)
    emit('deleted', props.journalEntry.id)
  } catch (error) {
    console.log(error)
  }
}

const items = [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Редактирование')
    },
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: deleteJournalEntry
    }
  ]
]
</script>