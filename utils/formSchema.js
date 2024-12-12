import { z } from "zod"

export const formSchema = () => {
  const emotionSchema = z.object({
    name: z.string(),
    isSelected: z.boolean(),
  })

  const negativeEmotionSchema = z.object({
    emotions: z.array(emotionSchema),
    confidenceBefore: z
      .number({ message: "Должно быть число" })
      .min(0, { message: "Значение должно быть больше или равно 0" })
      .max(100, { message: "Значение должно быть меньше или равно 100" }),
    confidenceAfter: z
      .number({ message: "Должно быть число" })
      .min(0, { message: "Значение должно быть больше или равно 0" })
      .max(100, { message: "Значение должно быть меньше или равно 100" }),
  })

  const negativeThoughtSchema = z.object({
    negativeThought: z
      .string({ message: "Обязательно для заполнения" })
      .min(1, { message: "Введите хотя бы 1 символ" }),
    confidenceBefore: z
      .number({ message: "Должно быть число" })
      .min(0, { message: "Значение должно быть больше или равно 0" })
      .max(100, { message: "Значение должно быть меньше или равно 100" }),
    confidenceAfter: z
      .number({ message: "Должно быть число" })
      .min(0, { message: "Значение должно быть больше или равно 0" })
      .max(100, { message: "Значение должно быть меньше или равно 100" }),
    distortionType: z.array(z.string()),
    positiveThought: z
      .string({ message: "Обязательно для заполнения" })
      .min(1, { message: "Введите хотя бы 1 символ" }),
    confidenceInPositive: z
      .number({ message: "Должно быть число" })
      .min(0, { message: "Значение должно быть больше или равно 0" })
      .max(100, { message: "Значение должно быть меньше или равно 100" }),
  })

  const schema = z.object({
    upsettingEvent: z
      .string({ message: "Обязательно для заполнения" })
      .min(1, { message: "Введите хотя бы 1 символ" }),
    negativeEmotions: z.array(negativeEmotionSchema),
    negativeThoughts: z.array(negativeThoughtSchema),
  })

  return { schema }
}
