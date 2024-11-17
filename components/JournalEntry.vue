<template>
  <div class="grid grid-cols-6 border-b py-2 items-center">
    <div class="text-gray-400 text-sm">
      {{ new Date(journalEntry.created_at).toLocaleDateString('ru-RU', {
        year: '2-digit',
        month: '2-digit',
        day: 'numeric',
      }) }}
    </div>
    <div class="col-span-4">{{ journalEntry.upsettingEvent }}</div>
    <UDropdown :items="items">
      <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal" />
      <JournalModal v-model:is-open="isEditJournalOpen" :journalEntry="journalEntry" @saved="emit('edited')" />
    </UDropdown>
  </div>
</template>
<script setup>
const props = defineProps({
  journalEntry: Object
})
const emit = defineEmits(['deleted', 'edited'])
const supabase = useSupabaseClient()
const isEditJournalOpen = ref(false)
const { toastSuccess, toastError } = useAppToast()

const deleteJournalEntry = async () => {
  try {
    await supabase.from('journal')
      .delete()
      .eq('id', props.journalEntry.id)
    toastSuccess({ title: 'Запись удалена' })
    emit('deleted', props.journalEntry.id)
  } catch (e) {
    toastError({
      title: 'Ошибка при удалении записи',
      description: e.message
    })
  }
}

const items = [
  [
    {
      label: 'Редактировать',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => isEditJournalOpen.value = true
    },
    {
      label: 'Удалить',
      icon: 'i-heroicons-trash-20-solid',
      click: deleteJournalEntry
    }
  ]
]
</script>