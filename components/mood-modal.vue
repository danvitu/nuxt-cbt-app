<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        Пройти опрос
      </template>
      <UForm :state="state" @submit="saveMood">
        <div class="mb-8">
          <div class="mb-4 font-bold">Тревожные чувства</div>
          <UFormGroup label="Тревога" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.anx[0]" />
          </UFormGroup>
          <UFormGroup label="Нервозность" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.anx[1]" />
          </UFormGroup>
          <UFormGroup label="Беспокойство" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.anx[2]" />
          </UFormGroup>
          <UFormGroup label="Страх или дурное предчувствие" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.anx[3]" />
          </UFormGroup>
          <UFormGroup label="Напряжение или состояние на грани" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.anx[4]" />
          </UFormGroup>
          <UDivider label="" />
          <div>Сумма по разделу "Тревожность": {{ anxiousSum }} </div>
        </div>
        <div class="mb-8">
          <div class="mb-4 font-bold">Физические симптомы тревоги</div>
          <UFormGroup label="Нерегулярное или учащенное сердцебиение, тахикардия" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[0]" />
          </UFormGroup>
          <UFormGroup label="Избыточная потливость, приступы холода или жара" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[1]" />
          </UFormGroup>
          <UFormGroup label="Мелкая или крупная дрожь" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[2]" />
          </UFormGroup>
          <UFormGroup label="Одышка или затрудненное дыхание" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[3]" />
          </UFormGroup>
          <UFormGroup label="Чувство удушья" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[4]" />
          </UFormGroup>
          <UFormGroup label="Боль или стеснение в груди" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[5]" />
          </UFormGroup>
          <UFormGroup label="«Бабочки в животе», тошнота, расстройство желудка" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[6]" />
          </UFormGroup>
          <UFormGroup label="Головокружение, потеря равновесия" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[7]" />
          </UFormGroup>
          <UFormGroup label="Чувство, как будто вы сами или мир вокруг вас нереальны" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[8]" />
          </UFormGroup>
          <UFormGroup label="Ощущение онемения или покалывания" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.phy[9]" />
          </UFormGroup>
          <UDivider label="" />
          <div>Сумма по разделу "Физические": {{ physicalSum }} </div>
        </div>
        <div class="mb-8">
          <div class="mb-4 font-bold">Депрессия</div>
          <UFormGroup label="Грусть или уныние" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.dep[0]" />
          </UFormGroup>
          <UFormGroup label="Чувство бессилия или безнадежности" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.dep[1]" />

          </UFormGroup>
          <UFormGroup label="Низкая самооценка" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.dep[2]" />

          </UFormGroup>
          <UFormGroup label="Чувство собственной никчемности или непригодности" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.dep[3]" />

          </UFormGroup>
          <UFormGroup label="Потеря чувства удовольствия и удовлетворенности от жизни" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.dep[4]" />

          </UFormGroup>
          <UDivider label="" />
          <div>Сумма по разделу "Депрессия": {{ depressionSum }} </div>
        </div>
        <div class="mb-8">
          <div class="mb-4 font-bold">Суицидальные импульсы</div>
          <UFormGroup label="Есть ли у вас суицидальные мысли?" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.sui[0]" />
          </UFormGroup>
          <UFormGroup label="Хотели бы вы покончить с собой?" class="mb-4">
            <URange color="red" :min="0" :max="5" v-model="state.sui[1]" />
          </UFormGroup>
          <UDivider label="" />
          <div>Сумма по разделу "Суицидальные": {{ suicidalSum }} </div>
        </div>
        <UButton type="submit" variant="solid" label="Отправить" />
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
const emit = defineEmits(['saved'])
const isOpen = defineModel('isOpen')
const supabase = useSupabaseClient()
const isLoading = ref(false)

const state = ref({
  anx: [],
  phy: [],
  dep: [],
  sui: []
})

// Рассчет суммы баллов по каждому из 4х разделов
const totalSum = (points) => {
  const sum = points.reduce((acc, currentValue) => acc + currentValue, 0);
  return sum
}

const anxiousSum = computed(() => totalSum(state.value.anx))
const physicalSum = computed(() => totalSum(state.value.phy))
const depressionSum = computed(() => totalSum(state.value.dep))
const suicidalSum = computed(() => totalSum(state.value.sui))

const moodState = ref({
  anxious_sum: anxiousSum,
  physical_sum: physicalSum,
  depression_sum: depressionSum,
  suicidal_sum: suicidalSum,
})

// Сохранение прохождения опроса настроения в базу
const saveMood = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('mood')
      .upsert(moodState.value)
      .select()
    isOpen.value = false
    emit('saved')
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

</script>