<template>
  <section class="flex justify-between mb-4">
    <h2 class="text-2xl font-extrabold mb-4">Опрос для определения настроения</h2>
    <div class="space-x-2">
      <UButton icon="i-heroicons-backward" color="white" variant="solid" label="Опросы"
        @click="isLastMoodOpen = true" />
      <UModal v-model="isLastMoodOpen">
        <div class="p-4">
          <div>Прошлые прохождения опроса</div>
          <USkeleton class="h-48" />
        </div>
      </UModal>

      <UButton icon="i-heroicons-plus-circle" variant="solid" label="Добавить" @click="isAddNewMoodOpen = true" />

      <!-- Модальное окно добавления опросника настроения  -->
      <UModal v-model="isAddNewMoodOpen">
        <UCard>
          <template #header>
            Пройти опрос
          </template>
          <UForm :state="state" @submit="saveMood">
            <div class="mb-8">
              <div class="mb-4 font-bold">Тревожные чувства</div>
              <UFormGroup label="Тревога" class="mb-4">
                <UInput type="number" v-model="state.anx[0]" />
              </UFormGroup>
              <UFormGroup label="Нервозность" class="mb-4">
                <UInput type="number" v-model="state.anx[1]" />
              </UFormGroup>
              <UFormGroup label="Беспокойство" class="mb-4">
                <UInput type="number" v-model="state.anx[2]" />
              </UFormGroup>
              <UFormGroup label="Страх или дурное предчувствие" class="mb-4">
                <UInput type="number" v-model="state.anx[3]" />
              </UFormGroup>
              <UFormGroup label="Напряжение или состояние на грани" class="mb-4">
                <UInput type="number" v-model="state.anx[4]" />
              </UFormGroup>
              <UDivider label="" />
              <div>Сумма по разделу "Тревожность": {{ anxiousSum }} </div>
            </div>
            <div class="mb-8">
              <div class="mb-4 font-bold">Физические симптомы тревоги</div>
              <UFormGroup label="Нерегулярное или учащенное сердцебиение, тахикардия" class="mb-4">
                <UInput type="number" v-model="state.phy[0]" />
              </UFormGroup>
              <UFormGroup label="Избыточная потливость, приступы холода или жара" class="mb-4">
                <UInput type="number" v-model="state.phy[1]" />
              </UFormGroup>
              <UFormGroup label="Мелкая или крупная дрожь" class="mb-4">
                <UInput type="number" v-model="state.phy[2]" />
              </UFormGroup>
              <UFormGroup label="Одышка или затрудненное дыхание" class="mb-4">
                <UInput type="number" v-model="state.phy[3]" />
              </UFormGroup>
              <UFormGroup label="Чувство удушья" class="mb-4">
                <UInput type="number" v-model="state.phy[4]" />
              </UFormGroup>
              <UFormGroup label="Боль или стеснение в груди" class="mb-4">
                <UInput type="number" v-model="state.phy[5]" />
              </UFormGroup>
              <UFormGroup label="«Бабочки в животе», тошнота, расстройство желудка" class="mb-4">
                <UInput type="number" v-model="state.phy[6]" />
              </UFormGroup>
              <UFormGroup label="Головокружение, потеря равновесия" class="mb-4">
                <UInput type="number" v-model="state.phy[7]" />
              </UFormGroup>
              <UFormGroup label="Чувство, как будто вы сами или мир вокруг вас нереальны" class="mb-4">
                <UInput type="number" v-model="state.phy[8]" />
              </UFormGroup>
              <UFormGroup label="Ощущение онемения или покалывания" class="mb-4">
                <UInput type="number" v-model="state.phy[9]" />
              </UFormGroup>
              <UDivider label="" />
              <div>Сумма по разделу "Физические": {{ physicalSum }} </div>
            </div>
            <div class="mb-8">
              <div class="mb-4 font-bold">Депрессия</div>
              <UFormGroup label="Грусть или уныние" class="mb-4">
                <UInput type="number" v-model="state.dep[0]" />
              </UFormGroup>
              <UFormGroup label="Чувство бессилия или безнадежности" class="mb-4">
                <UInput type="number" v-model="state.dep[1]" />
              </UFormGroup>
              <UFormGroup label="Низкая самооценка" class="mb-4">
                <UInput type="number" v-model="state.dep[2]" />
              </UFormGroup>
              <UFormGroup label="Чувство собственной никчемности или непригодности" class="mb-4">
                <UInput type="number" v-model="state.dep[3]" />
              </UFormGroup>
              <UFormGroup label="Потеря чувства удовольствия и удовлетворенности от жизни" class="mb-4">
                <UInput type="number" v-model="state.dep[4]" />
              </UFormGroup>
              <UDivider label="" />
              <div>Сумма по разделу "Депрессия": {{ depressionSum }} </div>
            </div>
            <div class="mb-8">
              <div class="mb-4 font-bold">Суицидальные импульсы</div>
              <UFormGroup label="Есть ли у вас суицидальные мысли?" class="mb-4">
                <UInput type="number" v-model="state.sui[0]" />
              </UFormGroup>
              <UFormGroup label="Хотели бы вы покончить с собой?" class="mb-4">
                <UInput type="number" v-model="state.sui[1]" />
              </UFormGroup>
              <UDivider label="" />
              <div>Сумма по разделу "Суицидальные": {{ suicidalSum }} </div>
            </div>
            <UButton type="submit" variant="solid" label="Отправить" />
          </UForm>
        </UCard>
      </UModal>
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
        <MoodEntry v-for="moodEntry in moodEntries" :moodEntry="moodEntry" :key="moodEntry.id" @deleted="refresh()" />
      </template>
    </div>
  </section>

  <!-- Записи журнала настроения -->
  <section class="flex justify-between mb-4">
    <h2 class="text-2xl font-extrabold">Все записи</h2>
    <div>
      <UButton icon="i-heroicons-plus-circle" variant="solid" label="Добавить" @click="isAddNewJournalOpen = true" />
    </div>
  </section>

  <section>
    <JournalEntry v-for="i in 3" :key="i" />
  </section>
</template>

<script setup>
const isLoading = ref(false)
const isLastMoodOpen = ref(false)
const isAddNewMoodOpen = ref(false)
const isAddNewJournalOpen = ref(false)
const supabase = useSupabaseClient()

const { data: moodEntries } = await useAsyncData('moods', async () => {
  isLoading.value = true
  try {
    const { data } = await supabase.from('mood').select()
    return data
  } finally {
    isLoading.value = false
  }
})

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

const state = ref({
  anx: [],
  phy: [],
  dep: [],
  sui: []
})

const totalSum = (points) => {
  const sum = points.reduce((acc, currentValue) => acc + currentValue, 0);
  return sum
}

const anxiousSum = computed(() => totalSum(state.value.anx))
const physicalSum = computed(() => totalSum(state.value.phy))
const depressionSum = computed(() => totalSum(state.value.dep))
const suicidalSum = computed(() => totalSum(state.value.sui))

const saveMood = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('mood')
      .upsert({
        anxious_sum: anxiousSum.value,
        physical_sum: physicalSum.value,
        depression_sum: depressionSum.value,
        suicidal_sum: suicidalSum.value,
      })
      .select()
    isAddNewMoodOpen.value = false
    refresh()
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}
</script>