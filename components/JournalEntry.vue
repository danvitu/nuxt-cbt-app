<template>
  <div class="grid grid-cols-5 border-b py-2 items-center">
    <div class="text-gray-400 text-sm">
      {{ formatDate(journalEntry.created_at) }}
    </div>
    <div class="col-span-3 cursor-pointer" @click="isEditJournalOpen = true">{{ journalEntry.upsettingEvent }}
    </div>
    <UDropdown :items="items">
      <UButton color="white" variant="ghost" icon="i-heroicons-ellipsis-horizontal" :loading="isLoading" />
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
const isLoading = ref(false)
const { toastSuccess, toastError } = useAppToast()

const deleteJournalEntry = async () => {
  isLoading.value = true
  try {
    const { error } = await supabase.from('journal')
      .delete()
      .eq('id', props.journalEntry.id)
    if (error) {
      throw error
    }
    emit('deleted', props.journalEntry.id)
    toastSuccess({ title: 'Запись удалена' })
  } catch (e) {
    toastError({
      title: 'Ошибка при удалении записи',
      description: e.message
    })
  } finally {
    isLoading.value = false
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