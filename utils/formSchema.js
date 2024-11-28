import { z } from "zod"

export const formSchema = () => {
  const emotionSchema = z.object({
    name: z.string(),
    isSelected: z.boolean(),
  })

  const negativeEmotionSchema = z.object({
    emotions: z.array(emotionSchema).optional(),
    confidenceBefore: z.number().min(0).max(100),
    confidenceAfter: z.number().min(0).max(100),
  })

  const negativeThoughtSchema = z.object({
    negativeThought: z.string().min(5, { message: "Введите более 5 символов" }),
    confidenceBefore: z.number().min(0).max(100),
    confidenceAfter: z.number().min(0).max(100),
    distortionType: z.array(z.string()),
    positiveThought: z.string().min(5, { message: "Введите более 5 символов" }),
    confidenceInPositive: z.number().min(0).max(100),
  })

  const schema = z.object({
    upsettingEvent: z.string().min(5, { message: "Введите более 5 символов" }),
    negativeEmotions: z.array(negativeEmotionSchema),
    negativeThoughts: z.array(negativeThoughtSchema),
  })

  const simpleSchema = z.object({
    upsettingEvent: z.string().min(5, { message: "Введите более 5 символов" }),
  })

  return { schema, simpleSchema }
}
