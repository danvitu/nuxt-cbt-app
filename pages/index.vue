<template>
  <!-- Опросник настроения -->
  <section class="mb-12">
    <div class="flex justify-between mb-4">
      <h2 class="text-2xl font-extrabold mb-4"><span class="text-primary">Опрос</span> настроения</h2>
      <div class="space-x-2">
        <UButton icon="i-heroicons-plus-circle" variant="solid" label="Пройти опрос" @click="isAddNewMoodOpen = true" />
        <MoodModal v-model:is-open="isAddNewMoodOpen" @saved="refreshMood" />
      </div>
    </div>
    <div class="grid grid-cols-6 text-xs md:font-semibold md:text-base border-b pb-4">
      <div>Дата</div>
      <div>Тревожные чувства</div>
      <div>Физические симптомы</div>
      <div>Депрессия</div>
      <div>Суицидальные импульсы</div>
    </div>
    <template v-if="statusMood === 'pending'">
      <USkeleton class="h-12 w-full py-2 border-b" v-for="i in moodEntries.length" :key="i" />
    </template>
    <template v-else>
      <MoodEntry v-for="moodEntry in moodEntries" :moodEntry="moodEntry" :key="moodEntry.id" @deleted="refreshMood" />
    </template>
  </section>

  <!-- Записи журнала настроения -->
  <section class="mb-12">
    <div class="flex justify-between mb-4">
      <h2 class="text-2xl font-extrabold mb-4"><span class="text-primary">Журнал</span> настроения</h2>
      <div class="space-x-2">
        <div class="space-x-2">
          <UButton icon="i-heroicons-plus-circle" variant="solid" label="Добавить запись"
            @click="isAddNewJournalOpen = true" />
          <JournalModal v-model:is-open="isAddNewJournalOpen" @saved="refreshJournal" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-6 text-xs md:font-semibold md:text-base border-b pb-4">
      <div>Дата</div>
      <div class="col-span-5">Запись журнала настроения</div>
    </div>
    <template v-if="statusJournal === 'pending'">
      <USkeleton class="h-12 w-full py-2 border-b" v-for="i in journalEntries.length" :key="i" />
    </template>
    <template v-else>
      <JournalEntry v-for="journalEntry in journalEntries" :journalEntry="journalEntry" :key="journalEntry.id"
        @deleted="refreshJournal" />
    </template>
  </section>
</template>

<script setup>
const isAddNewJournalOpen = ref(false)
const isAddNewMoodOpen = ref(false)
const supabase = useSupabaseClient()

// Загрузка опросов настроения из Supabase
const { data: moodEntries, refresh: refreshMood, status: statusMood } = await useAsyncData('moods', async () => {
  try {
    const { data } = await supabase.from('mood').select().order('created_at', { ascending: false })
    return data
  } catch (e) {
    console.log(e)
  }
})

// Загрузка журналов настроения из Supabase
const { data: journalEntries, refresh: refreshJournal, status: statusJournal } = await useAsyncData('journal', async () => {
  try {
    const { data } = await supabase.from('journal').select().order('created_at', { ascending: false })
    return data
  } catch (e) {
    console.log(e)
  }
})
</script>