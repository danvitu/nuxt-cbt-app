<template>
  <section class="flex justify-between mb-4">
    <h2 class="text-2xl font-extrabold mb-4"><span class="text-primary">Опрос</span> настроения</h2>
    <div class="space-x-2">
      <UButton icon="i-heroicons-plus-circle" variant="solid" label="Пройти опрос" @click="isAddNewMoodOpen = true" />
      <MoodModal v-model:is-open="isAddNewMoodOpen" @saved="refresh()" />
    </div>
  </section>

  <!-- Предыдущие результаты прохождения опросника  -->
  <section class="mb-12">
    <div>
      <div class="grid grid-cols-6 font-semibold border-b pb-4">
        <div>Дата</div>
        <div>Тревожные чувства</div>
        <div>Физические симптомы</div>
        <div>Депрессия</div>
        <div>Суицидальные импульсы</div>
      </div>
      <template v-if="isLoading">
        <USkeleton class="h-12 w-full py-2 border-b" v-for="i in 3" :key="i" />
      </template>
      <template v-else>
        <MoodEntry :moodEntries="moodEntries" @deleted="refresh()" />
      </template>
    </div>
  </section>

  <!-- Записи журнала настроения -->
  <section class="flex justify-between mb-4">
    <h2 class="text-2xl font-extrabold"><span class="text-primary">Журнал</span> настроения</h2>
    <div class="space-x-2">
      <UButton icon="i-heroicons-backward" color="white" variant="solid" label="Записи"
        @click="isLastJournalOpen = true" />
      <UModal v-model="isLastJournalOpen">
        <div class="p-4">
          <div>Все записи журнала настроения</div>
        </div>
      </UModal>
    </div>
  </section>

  <section>
    <UForm :state="stateJournal" @submit="saveJournal">
      <div class="font-semibold text-xl mb-4">Добавить новую запись в журнал</div>
      <UFormGroup
        label="Событие, которое меня расстроило (момент когда почувствовал упадок настроения, беспокойство или панику):"
        class="mb-6">
        <UTextarea :rows="2" autoresize v-model="stateJournal.upsettingEvent" />
      </UFormGroup>
      <NegativeEmotions v-model:negative-emotions="stateJournal.negativeEmotions" />
      <NegativeThoughts v-model:negative-thoughts="stateJournal.negativeThoughts" />
      <div class="">
        <UButton type="submit" icon="i-heroicons-plus-circle" label="Сохранить журнал" />
      </div>
    </UForm>
  </section>
</template>

<script setup>
const isLoading = ref(false)
const isLastJournalOpen = ref(false)
const isAddNewMoodOpen = ref(false)
const supabase = useSupabaseClient()

// Первоначальная загрузка опросов настроения из Supabase
const { data: moodEntries } = await useAsyncData('moods', async () => {
  isLoading.value = true
  try {
    const { data } = await supabase.from('mood').select()
    return data
  } finally {
    isLoading.value = false
  }
})

// Обновление компонента с записями опроса настроения из Supabase
const fetchMoods = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase.from('mood').select()
    if (error) throw Error
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
const refresh = async () => (moodEntries.value = await fetchMoods())

// Журнал настроения
const stateJournal = ref({
  upsettingEvent: '',
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
  }],
  negativeThoughts: []
})


// Отправка журнала настроения в Supabase
const saveJournal = async () => {

}
</script>