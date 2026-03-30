import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Database...')

  // Clear existing
  await prisma.listing.deleteMany()
  await prisma.keyword.deleteMany()
  await prisma.platform.deleteMany()

  // Seed Platforms
  const plat1 = await prisma.platform.create({ data: { name: 'Marketplace A', enabled: true } })
  const plat2 = await prisma.platform.create({ data: { name: 'Marketplace B', enabled: true } })
  const plat3 = await prisma.platform.create({ data: { name: 'Social Platform X', enabled: true } })

  // Seed Keywords
  const keywords = [
    // SCIENTIFIC (High risk weight)
    { term: 'Manis javanica', type: 'SCIENTIFIC', riskWeight: 3 },
    { term: 'Rhinocerotidae', type: 'SCIENTIFIC', riskWeight: 3 },
    { term: 'Elephantidae', type: 'SCIENTIFIC', riskWeight: 3 },
    
    // TRADE NAME
    { term: 'Ivory', type: 'TRADE_NAME', riskWeight: 3 },
    { term: 'Pangolin scale', type: 'TRADE_NAME', riskWeight: 3 },
    { term: 'Tiger bone', type: 'TRADE_NAME', riskWeight: 3 },
    { term: 'Rhino horn', type: 'TRADE_NAME', riskWeight: 3 },
    { term: 'Turtle shell', type: 'TRADE_NAME', riskWeight: 2 },
    
    // CODED PHRASE
    { term: 'White gold', type: 'CODED_PHRASE', riskWeight: 2 },
    { term: 'Jelly beans', type: 'CODED_PHRASE', riskWeight: 1 }, // Sometimes used for pills/animal pills, let's keep it low
    { term: 'Antique carving', type: 'CODED_PHRASE', riskWeight: 1 },
    { term: 'Dragon powder', type: 'CODED_PHRASE', riskWeight: 2 }, // Coded term for rhino/tiger derivatives
    { term: 'Yellow material', type: 'CODED_PHRASE', riskWeight: 2 }, // Horn/Ivory substitute
  ]

  for (const kw of keywords) {
    await prisma.keyword.create({ data: kw })
  }

  // Generate Listings
  // Helper to generate a random 2 weeks past date
  const randomDate = () => {
    const d = new Date()
    d.setDate(d.getDate() - Math.floor(Math.random() * 14))
    d.setHours(d.getHours() - Math.floor(Math.random() * 24))
    return d
  }

  const listings = [
    // HIGH RISK 
    {
      title: 'Rare Antique Carving - Genuine White Gold Material',
      description: 'Acquired from a private collection. Beautiful detailing on this large piece of white gold. Extremely rare and cannot be officially sourced anymore. Message for private sale only. Serious inquiries. #antiques #rare',
      seller: 'Collector_99',
      url: 'https://example.com/listing/x8d9',
      platformId: plat1.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 92,
      explanation: 'High risk detected. Matched multiple critical trade identifiers or coded phrases: Antique carving, White gold. Immediate manual review recommended.',
      matchedWords: JSON.stringify(['Antique carving', 'White gold']),
      archivedText: 'Captured 5 minutes ago. Seller has restricted views.',
      postedTime: randomDate()
    },
    {
      title: 'Pangolin Scales for Traditional Use 1kg',
      description: 'High quality raw African pangolin scale whole. Ethically sourced before ban. Used for traditional teas and remedies. Fast discrete shipping.',
      seller: 'HealthBazaar_UK',
      url: 'https://example.com/listing/p21',
      platformId: plat2.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 98,
      explanation: 'High risk detected. Matched multiple critical trade identifiers or coded phrases: Pangolin scale. Immediate manual review recommended.',
      matchedWords: JSON.stringify(['Pangolin scale']),
      archivedText: 'Listing active. Seller has 12 previous reviews mentioning traditional remedies.',
      postedTime: randomDate()
    },
    {
      title: 'Antique Tusk ornament carved',
      description: 'Massive Elephantidae material carving. Family heirloom from the 1920s. Heavy authentic piece.',
      seller: 'EstateSales_NY',
      url: 'https://example.com/listing/e8s',
      platformId: plat1.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 90,
      explanation: 'High risk detected. Matched scientific term Elephantidae.',
      matchedWords: JSON.stringify(['Elephantidae', 'Antique carving']), // Assuming matching
      archivedText: 'Seller removed listing 2 minutes ago.',
      postedTime: randomDate()
    },
    {
      title: 'Dragon Powder - Authentic Source',
      description: 'Finely milled Rhinocerotidae derivative. Red packaging. Imported via secure channels.',
      seller: 'Import_Masters',
      url: 'https://example.com/listing/h8s',
      platformId: plat3.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 99,
      explanation: 'High risk detected. Matched scientific term and coded phrase.',
      matchedWords: JSON.stringify(['Rhinocerotidae', 'Dragon powder']), 
      archivedText: 'Listing verified.',
      postedTime: randomDate()
    },
    {
      title: 'Genuine Tiger Bone Extract',
      description: 'Imported tiger bone wine / extract for strength and vitality.',
      seller: 'Traditional_Hub',
      url: 'https://example.com/listing/t1a',
      platformId: plat2.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 100,
      explanation: 'Direct match for highly restricted trade name.',
      matchedWords: JSON.stringify(['Tiger bone']), 
      archivedText: 'Cached before take-down.',
      postedTime: randomDate()
    },
    // Add 5 more later or dynamically, I will just make the 10 total
    {
      title: 'Real Rhino Horn piece with certificate',
      description: 'Complete uncarved piece',
      seller: 'X_Trader',
      url: 'https://example.com/listing/r5',
      platformId: plat1.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 95,
      explanation: 'Trade name match.',
      matchedWords: JSON.stringify(['Rhino horn']), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    },
    {
      title: '100% pure yellow material beads',
      description: 'Sourced from old necklaces. Yellow material test scratch passed. Smells like bones when burned.',
      seller: 'Bead_collector',
      url: 'https://example.com/listing/y7',
      platformId: plat3.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 88,
      explanation: 'Matches coded substitute for ivory/horn.',
      matchedWords: JSON.stringify(['Yellow material']), 
      archivedText: 'Archived screenshots exist.',
      postedTime: randomDate()
    },
    {
      title: 'Live Manis javanica for breeding',
      description: 'Healthy pair of pangolins ready for shipping.',
      seller: 'Exotic_Pets_Worldwide',
      url: 'https://example.com/listing/m1',
      platformId: plat2.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 100,
      explanation: 'Scientific match for live trade.',
      matchedWords: JSON.stringify(['Manis javanica']), 
      archivedText: 'Flagged by interpol.',
      postedTime: randomDate()
    },
    {
      title: 'Large unprocessed ivory chunk',
      description: 'Pristine piece.',
      seller: 'Anon_S',
      url: 'https://example.com/listing/i2',
      platformId: plat1.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 100,
      explanation: 'Direct match.',
      matchedWords: JSON.stringify(['Ivory']), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    },
    {
      title: 'Antique turtle shell guitar pick',
      description: 'Very old, true turtle shell piece',
      seller: 'Guitar_man',
      url: 'https://example.com/listing/t3',
      platformId: plat1.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 85,
      explanation: 'Marine turtle shell products are restricted.',
      matchedWords: JSON.stringify(['Turtle shell', 'Antique']), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    },

    // SUSPICIOUS
    {
      title: 'Unusual white carving',
      description: 'Looks like bone or tooth but selling as faux ivory. Very heavy.',
      seller: 'FleaMarket_Finds',
      url: 'https://example.com/listing/s1',
      platformId: plat2.id,
      riskLevel: 'SUSPICIOUS',
      confidenceScore: 65,
      explanation: 'Contains suspicious keywords next to faux claims. Requires manual review.',
      matchedWords: JSON.stringify(['Ivory']), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    },
    {
      title: 'Old medicine box',
      description: 'Contains various traditional herbs and dragon powder.',
      seller: 'Med_Old',
      url: 'https://example.com/listing/s2',
      platformId: plat3.id,
      riskLevel: 'SUSPICIOUS',
      confidenceScore: 60,
      explanation: 'Matches coded term.',
      matchedWords: JSON.stringify(['Dragon powder']), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    },
    {
      title: 'Collection of unusual scales',
      description: 'Could be pangolin or armadillo, unknown.',
      seller: 'Curiosities',
      url: 'https://example.com/listing/s3',
      platformId: plat1.id,
      riskLevel: 'SUSPICIOUS',
      confidenceScore: 70,
      explanation: 'Mentions restricted species alongside doubt.',
      matchedWords: JSON.stringify(['Pangolin']), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    },

    // LIKELY LEGAL
    {
      title: 'Vintage Faux Ivory Piano Keys',
      description: 'Plastic replicas for restoration. Made in 2010.',
      seller: 'Piano_Parts',
      url: 'https://example.com/listing/l1',
      platformId: plat1.id,
      riskLevel: 'LIKELY_LEGAL',
      confidenceScore: 15,
      explanation: 'Explicitly labeled as replica/plastic.',
      matchedWords: JSON.stringify([]), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    },
    {
      title: 'Tiger Print Fleece Blanket',
      description: 'Soft faux fur blanket with tiger stripes. No real animal products.',
      seller: 'Home_Comforts',
      url: 'https://example.com/listing/l2',
      platformId: plat2.id,
      riskLevel: 'LIKELY_LEGAL',
      confidenceScore: 5,
      explanation: 'No restricted terms found.',
      matchedWords: JSON.stringify([]), 
      archivedText: 'Listing active.',
      postedTime: randomDate()
    }
  ]

  for (const list of listings) {
    await prisma.listing.create({ data: list })
  }

  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
