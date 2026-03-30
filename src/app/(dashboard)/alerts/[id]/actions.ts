'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export async function updateCaseStatus(id: string, status: string) {
  await prisma.listing.update({
    where: { id },
    data: { status },
  })
  revalidatePath(`/alerts/${id}`)
}

export async function saveAnalystNotes(id: string, notes: string) {
  await prisma.listing.update({
    where: { id },
    data: { analystNotes: notes },
  })
  revalidatePath(`/alerts/${id}`)
}
