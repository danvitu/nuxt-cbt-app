<template>
  <div class="border-b">
    <div class="grid sm:grid-cols-6 grid-cols-5 py-2 items-center gap-4">
      <div class="text-slate-400 md:text-sm text-xs hidden sm:block">{{ formatDate(moodEntry.created_at) }}</div>
      <div>{{ moodEntry.anxious_sum }}</div>
      <div>{{ moodEntry.physical_sum }}</div>
      <div>{{ moodEntry.depression_sum }}</div>
      <div>{{ suicidalSum }}</div>
      <div class="flex justify-end gap-1">
        <UButton
icon="i-heroicons-eye" color="primary" variant="soft" :trailing="false"
          @click="isResultModalOpen = true" />
        <UButton
icon="i-heroicons-trash-20-solid" color="red" square variant="soft" :loading="isLoading"
          @click="deleteEntry" />
      </div>
      <MoodResultModal v-model:is-open="isResultModalOpen" :mood-entry="moodEntry" />
    </div>
    <div class="block sm:hidden text-xs text-right text-slate-400">{{ formatDate(moodEntry.created_at) }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  moodEntry: {
    type: Object,
    default: () => { }
  }
})
const emit = defineEmits(['deleted'])
const suicidalSum = computed(() => props.moodEntry.suicidal_1 + props.moodEntry.suicidal_2)
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
</script>