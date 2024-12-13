<template>
  <div class="flex-1">
    <section class="mt-8 flex-1">
      <div class="flex justify-between mb-8">
        <div>
          <h2 class="text-2xl"><span class="text-primary">Журнал</span> настроения</h2>
          <div class="flex gap-2 text-xs mt-4">
            <div :class="{ 'opacity-20': showJournalEntriesNumber }">Недавние</div>
            <UToggle size="sm" v-model="showJournalEntriesNumber" :ui="{ active: 'bg-slate-500 dark:bg-slate-400' }" />
            <div :class="{ 'opacity-20': !showJournalEntriesNumber }">Все записи</div>
          </div>
        </div>
        <div>
          <UButton icon="i-heroicons-plus-circle" variant="solid" label="Запись" @click="isAddJournalOpen = true" />
          <JournalModal v-model:is-open="isAddJournalOpen" @saved="refreshJournal" />
        </div>
      </div>
      <div v-if="limitedJournalEntries.length !== 0"
        class="grid sm:grid-cols-6 grid-cols-5 font-semibold pb-2 gap-4 sm:text-base text-sm">
        <div>Дата</div>
        <div class="sm:col-span-4 col-span-3">Запись журнала настроения</div>
      </div>
      <div v-if="statusJournal === 'pending'">
        <USkeleton class="h-12 w-full py-2 border-b" v-for="i in journalEntries.length" :key="i" />
      </div>
      <div v-else-if="limitedJournalEntries.length === 0">У вас нет записей в журнале. Нажмите на кнопку "Запись", чтобы
        добавить.
      </div>
      <template v-else>
        <JournalEntry v-for="journalEntry in limitedJournalEntries" :journalEntry="journalEntry" :key="journalEntry.id"
          @deleted="refreshJournal" @edited="refreshJournal" />
      </template>
    </section>

    <section class="flex-1 mt-8">
      <div class="flex justify-between mb-8">
        <div>
          <h2 class="text-2xl"><span class="text-primary">Опрос</span> настроения</h2>
          <div class="flex gap-2 text-xs mt-4">
            <div :class="{ 'opacity-20': showMoodEntriesNumber }">Недавние</div>
            <UToggle size="sm" :ui="{ active: 'bg-slate-500 dark:bg-slate-400' }" v-model="showMoodEntriesNumber" />
            <div :class="{ 'opacity-20': !showMoodEntriesNumber }">Все записи</div>
          </div>
        </div>
        <div>
          <UButton icon="i-heroicons-plus-circle" variant="solid" label="Опрос" @click="isAddNewMoodOpen = true" />
          <MoodModal v-model:is-open="isAddNewMoodOpen" @saved="refreshMood" />
        </div>
      </div>
      <div v-if="limitedMoodEntries.length !== 0"
        class="grid sm:grid-cols-6 grid-cols-5 sm:font-semibold sm:text-base text-xs pb-4 gap-4">
        <div class="hidden sm:block">Дата</div>
        <div class="">Тревожные чувства</div>
        <div class="">Физические симптомы</div>
        <div class="">Депрессия</div>
        <div class="">Суицидальные импульсы</div>
      </div>
      <template v-if="statusMood === 'pending'">
        <USkeleton class="h-12 w-full py-2 border-b" v-for="i in moodEntries.length" :key="i" />
      </template>
      <div v-else-if="moodEntries.length === 0">У вас нет записей в дневнике. Нажмите на кнопку "Опрос", чтобы добавить.
      </div>
      <template v-else>
        <MoodEntry v-for="moodEntry in limitedMoodEntries" :moodEntry="moodEntry" :key="moodEntry.id"
          @deleted="refreshMood" />
      </template>
    </section>
  </div>
</template>

<script setup>
const isAddJournalOpen = ref(false)
const isAddNewMoodOpen = ref(false)
const showMoodEntriesNumber = ref(false)
const showJournalEntriesNumber = ref(false)
const supabase = useSupabaseClient()
const { toastError } = useAppToast()
useSeoMeta({
  title: "Приложение",
  robots: 'noindex, follow'
})


// Загрузка опросов настроения из Supabase
const { data: moodEntries, refresh: refreshMood, status: statusMood } = await useAsyncData('moods', async () => {
  try {
    const { data, error } = await supabase.from('mood').select().order('created_at', { ascending: false })
    if (error) {
      throw error
    }
    return data
  } catch (e) {
    toastError({
      title: 'Ошибка при загрузке записей',
      description: e.message
    })
    return []
  }
})

// Загрузка журналов настроения из Supabase
const { data: journalEntries, refresh: refreshJournal, status: statusJournal } = await useAsyncData('journal', async () => {
  try {
    const { data, error } = await supabase.from('journal').select().order('created_at', { ascending: false })
    if (error) {
      throw error
    }
    return data
  } catch (e) {
    toastError({
      title: 'Ошибка при загрузке записей',
      description: e.message
    })
    return []
  }
})
const limitedMoodEntries = computed(() => showMoodEntriesNumber.value ? moodEntries.value : moodEntries.value.slice(0, 5))
const limitedJournalEntries = computed(() => showJournalEntriesNumber.value ? journalEntries.value : journalEntries.value.slice(0, 5))
</script>
