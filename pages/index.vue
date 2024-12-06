<template>
  <!-- Опросник настроения -->
  <section class="mb-12">
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
    <div class="grid grid-cols-5 md:font-semibold md:text-base text-xs pb-4">
      <div>Тревожные чувства</div>
      <div>Физические симптомы</div>
      <div>Депрессия</div>
      <div>Суицидальные мысли</div>
    </div>
    <template v-if="statusMood === 'pending'">
      <USkeleton class="h-12 w-full py-2 border-b" v-for="i in moodEntries.length" :key="i" />
    </template>
    <template v-else>
      <MoodEntry v-for="moodEntry in limitedMoodEntries" :moodEntry="moodEntry" :key="moodEntry.id"
        @deleted="refreshMood" />
    </template>
  </section>

  <!-- Записи журнала настроения -->
  <section class="mb-12">
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
    <div class="grid grid-cols-5 font-semibold border-b pb-4">
      <div>Дата</div>
      <div class="col-span-4">Запись журнала настроения</div>
    </div>
    <template v-if="statusJournal === 'pending'">
      <USkeleton class="h-12 w-full py-2 border-b" v-for="i in journalEntries.length" :key="i" />
    </template>
    <template v-else>
      <JournalEntry v-for="journalEntry in limitedJournalEntries" :journalEntry="journalEntry" :key="journalEntry.id"
        @deleted="refreshJournal" @edited="refreshJournal" />
    </template>
  </section>
</template>

<script setup>
const isAddJournalOpen = ref(false)
const isAddNewMoodOpen = ref(false)
const showMoodEntriesNumber = ref(false)
const showJournalEntriesNumber = ref(false)
const supabase = useSupabaseClient()
const { toastError } = useAppToast()

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