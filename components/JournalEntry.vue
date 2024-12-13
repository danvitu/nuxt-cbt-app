<template>
  <div class="grid sm:grid-cols-6 grid-cols-5 border-b py-2 items-center gap-4">
    <div class="text-gray-400 md:text-sm text-xs">
      {{ formatDate(journalEntry.created_at) }}
    </div>
    <div class="sm:col-span-4 col-span-3 cursor-pointer overflow-hidden text-ellipsis line-clamp-2"
      @click="isEditJournalOpen = true">
      {{
        journalEntry.upsettingEvent }}
    </div>
    <div class="flex justify-end gap-1">
      <UButton icon="i-heroicons-pencil-square-20-solid" color="primary" variant="soft" :trailing="false"
        @click="isEditJournalOpen = true" />
      <UButton icon="i-heroicons-trash-20-solid" color="red" square variant="soft" @click="deleteJournalEntry"
        :loading="isLoading" />
      <JournalModal v-model:is-open="isEditJournalOpen" :journalEntry="journalEntry" @saved="emit('edited')" />
    </div>
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
</script>