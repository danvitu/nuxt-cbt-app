<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-5xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-xl">Журнал настроения</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
        </div>
      </template>
      <UForm :state="stateJournal" :schema="schema" @submit="saveJournal">
        <div class="font-semibold text-xl mb-4">{{ isEditing ? `Редактировать запись от
          ${journalEntry.created_at.split('T')[0]}`
          :
          'Добавить новую запись' }}
        </div>
        <UFormGroup
          label="Событие, которое меня расстроило (момент когда почувствовал упадок настроения, беспокойство или панику):"
          name="upsettingEvent" class="mb-6">
          <UTextarea :rows="2" autoresize v-model="stateJournal.upsettingEvent" />
        </UFormGroup>
        <NegativeEmotions v-model:negative-emotions="stateJournal.negativeEmotions" />
        <NegativeThoughts v-model:negative-thoughts="stateJournal.negativeThoughts" />
        <div>
          <UButton type="submit" icon="i-heroicons-arrow-down-on-square" label="Сохранить журнал" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
const props = defineProps({
  journalEntry: {
    type: Object,
    required: false
  }
})
const emit = defineEmits(['saved'])
const isOpen = defineModel('isOpen')
const supabase = useSupabaseClient()
const { toastSuccess, toastError } = useAppToast()
const isEditing = computed(() => !!props.journalEntry)
const initialState = isEditing.value ? {
  upsettingEvent: props.journalEntry.upsettingEvent,
  negativeEmotions: props.journalEntry.negativeEmotions,
  negativeThoughts: props.journalEntry.negativeThoughts
} : {
  upsettingEvent: undefined,
  negativeEmotions: [{
    emotions: [
      { name: 'Грусть', isSelected: false },
      { name: 'Подавленность', isSelected: false },
      { name: 'Упадок настроения', isSelected: false },
      { name: 'Печаль', isSelected: false }
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Тревога', isSelected: false },
      { name: 'Беспокойство', isSelected: false },
      { name: 'Паника', isSelected: false },
      { name: 'Нервозность', isSelected: false },
      { name: 'Страх', isSelected: false },
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Вина', isSelected: false },
      { name: 'Угрызения совести', isSelected: false },
      { name: 'Стыд', isSelected: false },
      { name: 'Сожаление', isSelected: false },
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Чувство собственной неполноценности', isSelected: false },
      { name: 'Никчемности', isSelected: false },
      { name: 'Непригодности', isSelected: false },
      { name: 'Ущербности', isSelected: false },
      { name: 'Некомпетентности', isSelected: false },
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Одиночество', isSelected: false },
      { name: 'Никто не любит', isSelected: false },
      { name: 'Никому не нужен', isSelected: false },
      { name: 'Чувствую себя отвергнутым', isSelected: false },
      { name: 'Брошенным', isSelected: false },
      { name: 'Оставленным', isSelected: false },
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Смущение', isSelected: false },
      { name: 'Чувствую себя глупо', isSelected: false },
      { name: 'Унизительно', isSelected: false },
      { name: 'Зациклен на себе', isSelected: false },
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Безнадежность', isSelected: false },
      { name: 'Уныние', isSelected: false },
      { name: 'Пессимизм', isSelected: false },
      { name: 'Отчаяние', isSelected: false },
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Досада', isSelected: false },
      { name: 'Чувство тупиковости', isSelected: false },
      { name: 'Поверженности', isSelected: false },
      { name: 'Преград на пути', isSelected: false },
    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  },
  {
    emotions: [
      { name: 'Злость', isSelected: false },
      { name: 'Гнев', isSelected: false },
      { name: 'Обида', isSelected: false },
      { name: 'Раздражение', isSelected: false },
      { name: 'Рассержен', isSelected: false },
      { name: 'Расстроен', isSelected: false },
      { name: 'В бешенстве', isSelected: false },

    ],
    confidenceBefore: 0,
    confidenceAfter: 0
  }],
  negativeThoughts: [{
    negativeThought: undefined,
    confidenceBefore: 0,
    confidenceAfter: 0,
    distortionType: [],
    positiveThought: undefined,
    confidenceInPositive: 0
  }]
}

const stateJournal = ref(JSON.parse(JSON.stringify(initialState)))

const { simpleSchema: schema } = formSchema()

const saveJournal = async () => {
  try {
    const { error } = await supabase
      .from('journal')
      .upsert({ ...stateJournal.value, id: props.journalEntry?.id })
    if (error) throw error
    emit('saved')
    toastSuccess({
      title: isEditing.value ? 'Запись обновлена' : 'Новая запись сохранена'
    })
    isOpen.value = false
    if (!isEditing.value) stateJournal.value = JSON.parse(JSON.stringify(initialState))
  } catch (e) {
    toastError({
      title: 'Ошибка!',
      description: e.message
    })
  }
}
</script>