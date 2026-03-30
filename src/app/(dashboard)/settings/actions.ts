'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export async function addKeyword(formData: FormData) {
  const term = formData.get('term') as string
  const type = formData.get('type') as string
  const riskWeight = parseInt(formData.get('riskWeight') as string)

  if (!term || !type || isNaN(riskWeight)) return { error: 'Invalid data' }

  try {
    await prisma.keyword.create({
      data: { term, type, riskWeight }
    })
    revalidatePath('/settings')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}

export async function deleteKeyword(id: string) {
  try {
    await prisma.keyword.delete({ where: { id } })
    revalidatePath('/settings')
    return { success: true }
  } catch (e: any) {
    return { error: e.message }
  }
}
