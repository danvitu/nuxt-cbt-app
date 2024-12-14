<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <div class="flex items-center gap-1">
            <h3 class="font-bold text-xl">Опрос для определения настроения</h3>
            <UPopover>
              <UButton color="white" variant="ghost" label="" trailing-icon="i-heroicons-information-circle" />
              <template #panel>
                <div class="p-4 max-w-xl">
                  <p>Выберите ваш балл по каждому из пунктов, основываясь на том, как вы
                    чувствовали себя в последнее
                    время.</p>
                  <br>
                  <div>
                    Оцените каждый пункт по следующей шкале:</div>
                  <div>0 — совсем нет</div>
                  <div>1 — немного</div>
                  <div>2 — умеренно</div>
                  <div>3 — сильно</div>
                  <div>4 — очень сильно</div>
                </div>
              </template>
            </UPopover>
          </div>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
        </div>
      </template>
      <UForm :state="state" @submit="saveMood">
        <div class="mb-8">
          <UDivider class="mb-4" :ui="{ label: 'text-base font-bold' }" label="Тревожные чувства" />
          <UFormGroup :label="`Тревога: ${state.anx[0]}`" class="mb-4">
            <URange v-model="state.anx[0]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Нервозность: ${state.anx[1]}`" class="mb-4">
            <URange v-model="state.anx[1]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Беспокойство: ${state.anx[2]}`" class="mb-4">
            <URange v-model="state.anx[2]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Страх или дурное предчувствие: ${state.anx[3]}`" class="mb-4">
            <URange v-model="state.anx[3]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Напряжение или состояние на грани: ${state.anx[4]}`" class="mb-4">
            <URange v-model="state.anx[4]" :min="0" :max="4" />
          </UFormGroup>
        </div>
        <div class="mb-8">
          <UDivider class="mb-4" :ui="{ label: 'text-base font-bold' }" label="Физические симптомы тревоги" />
          <UFormGroup :label="`Нерегулярное или учащенное сердцебиение, тахикардия: ${state.phy[0]}`" class="mb-4">
            <URange v-model="state.phy[0]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Избыточная потливость, приступы холода или жара: ${state.phy[1]}`" class="mb-4">
            <URange v-model="state.phy[1]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Мелкая или крупная дрожь: ${state.phy[2]}`" class=" mb-4">
            <URange v-model="state.phy[2]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Одышка или затрудненное дыхание: ${state.phy[3]}`" class="mb-4">
            <URange v-model="state.phy[3]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Чувство удушья: ${state.phy[4]}`" class="mb-4">
            <URange v-model="state.phy[4]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Боль или стеснение в груди: ${state.phy[5]} `" class="mb-4">
            <URange v-model="state.phy[5]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`«Бабочки в животе», тошнота, расстройство желудка: ${state.phy[6]}`" class="mb-4">
            <URange v-model="state.phy[6]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Головокружение, потеря равновесия: ${state.phy[7]}`" class="mb-4">
            <URange v-model="state.phy[7]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Чувство, как будто вы сами или мир вокруг вас нереальны: ${state.phy[8]}`" class="mb-4">
            <URange v-model="state.phy[8]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Ощущение онемения или покалывания: ${state.phy[9]}`" class="mb-4">
            <URange v-model="state.phy[9]" :min="0" :max="4" />
          </UFormGroup>
        </div>
        <div class="mb-8">
          <div class="mb-4 font-bold">Депрессия</div>
          <UFormGroup :label="`Грусть или уныние: ${state.dep[0]}`" class="mb-4">
            <URange v-model="state.dep[0]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Чувство бессилия или безнадежности: ${state.dep[1]}`" class="mb-4">
            <URange v-model="state.dep[1]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Низкая самооценка: ${state.dep[2]}`" class="mb-4">
            <URange v-model="state.dep[2]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Чувство собственной никчемности или непригодности: ${state.dep[3]}`" class="mb-4">
            <URange v-model="state.dep[3]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Потеря чувства удовольствия и удовлетворенности от жизни: ${state.dep[4]}`" class="mb-4">
            <URange v-model="state.dep[4]" :min="0" :max="4" />
          </UFormGroup>
        </div>
        <div class="mb-8">
          <div class="mb-4 font-bold">Суицидальные импульсы</div>
          <UFormGroup :label="`Есть ли у вас суицидальные мысли: ${state.sui[0]}`" class="mb-4">
            <URange v-model="state.sui[0]" :min="0" :max="4" />
          </UFormGroup>
          <UFormGroup :label="`Хотели бы вы покончить с собой: ${state.sui[1]}`" class="mb-4">
            <URange v-model="state.sui[1]" :min="0" :max="4" />
          </UFormGroup>
        </div>
        <UButton type="submit" variant="solid" label="Отправить" :loading="isLoading" />
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
const emit = defineEmits(['saved'])
const isOpen = defineModel('isOpen', { type: Boolean })
const supabase = useSupabaseClient()
const isLoading = ref(false)
const { toastSuccess, toastError } = useAppToast()

const initialState = {
  anx: [0, 0, 0, 0, 0],
  phy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  dep: [0, 0, 0, 0, 0],
  sui: [0, 0]
}

const state = ref(JSON.parse(JSON.stringify(initialState)))

// Рассчет суммы баллов по каждому из 4х разделов
const totalSum = (points) => {
  const sum = points.reduce((acc, currentValue) => acc + currentValue, 0);
  return sum
}

const moodsSum = computed(() => ({
  anxious_sum: totalSum(state.value.anx),
  physical_sum: totalSum(state.value.phy),
  depression_sum: totalSum(state.value.dep),
  suicidal_1: state.value.sui[0],
  suicidal_2: state.value.sui[1]
}));

// Сохранение прохождения опроса настроения в базу
const saveMood = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('mood')
      .insert(moodsSum.value)
      .select()
    if (error) throw error
    emit('saved', data[0])
    toastSuccess({ title: 'Опрос сохранен' })
    isOpen.value = false
    resetForm()
  } catch (e) {
    toastError({
      title: 'Опрос не был сохранен',
      description: e.message
    })
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  state.value = JSON.parse(JSON.stringify(initialState))
}
</script>