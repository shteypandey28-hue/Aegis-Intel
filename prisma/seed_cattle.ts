import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Add new detection keywords for wild cattle species
  const cattleKeywords = [
    { term: 'Wild buffalo', type: 'TRADE_NAME', riskWeight: 3 },
    { term: 'Buffalo horn', type: 'TRADE_NAME', riskWeight: 3 },
    { term: 'Bushmeat', type: 'TRADE_NAME', riskWeight: 3 },
    { term: 'Gaur', type: 'SCIENTIFIC', riskWeight: 3 },
    { term: 'Banteng', type: 'SCIENTIFIC', riskWeight: 3 },
    { term: 'Bubalus arnee', type: 'SCIENTIFIC', riskWeight: 3 },
    { term: 'Tembadau', type: 'CODED_PHRASE', riskWeight: 2 },
    { term: 'Seladang', type: 'CODED_PHRASE', riskWeight: 2 },
    { term: 'Wild beef', type: 'CODED_PHRASE', riskWeight: 2 },
    { term: 'Jungle beef', type: 'CODED_PHRASE', riskWeight: 2 },
    { term: 'Forest buffalo', type: 'CODED_PHRASE', riskWeight: 2 },
    { term: 'Exotic beef', type: 'CODED_PHRASE', riskWeight: 2 },
  ]

  for (const kw of cattleKeywords) {
    await prisma.keyword.upsert({
      where: { term: kw.term },
      update: {},
      create: kw,
    })
  }

  // Get existing platforms
  const platforms = await prisma.platform.findMany()
  if (platforms.length === 0) {
    console.error('No platforms found. Run the main seed first.')
    return
  }
  const plat1 = platforms[0]
  const plat2 = platforms[1] ?? platforms[0]
  const plat3 = platforms[2] ?? platforms[0]

  const randomDate = () => {
    const d = new Date()
    d.setDate(d.getDate() - Math.floor(Math.random() * 7))
    d.setHours(d.getHours() - Math.floor(Math.random() * 12))
    return d
  }

  const listings = [
    {
      title: 'Rare Forest Buffalo Meat — Direct from Jungle',
      description: 'Fresh Bubalus arnee sourced deep from Assam forest reserve. Wild buffalo, not farmed. Selling by the kg. Discreet packaging and overnight shipping available. DM for price list. No questions asked.',
      seller: 'WildMeat_IN',
      url: 'https://example.com/listing/wb1',
      platformId: plat1.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 96,
      explanation: 'Critical match on scientific name Bubalus arnee and coded phrase "forest buffalo". Wild Water Buffalo is CITES Appendix III protected. Sale of wild-sourced carcasses is a trafficking offence.',
      matchedWords: JSON.stringify(['Bubalus arnee', 'Forest buffalo', 'Bushmeat']),
      archivedText: 'Listing still active. Seller has 4 prior listings removed.',
      status: 'ACTIVE',
      analystNotes: '',
      postedTime: randomDate(),
    },
    {
      title: 'Gaur Horn Trophy — Large Male, Unprocessed',
      description: 'Trophy horn from seladang (Indian bison / Bos gaurus). Trophy hunting permit attached (PDF). Export ready. Ideal for private collection. Matches CITES condition from legacy stock.',
      seller: 'TrophyExports_MY',
      url: 'https://example.com/listing/g1',
      platformId: plat2.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 93,
      explanation: 'Scientific match on Bos gaurus. "Seladang" is a known coded regional term for Gaur. Trophy horn trade without valid CITES export permit is illegal under Appendix I listing.',
      matchedWords: JSON.stringify(['Gaur', 'Seladang', 'Wild beef']),
      archivedText: 'Seller account created 3 days ago.',
      status: 'FLAGGED',
      analystNotes: 'Seller claims permit but no verifiable CITES permit number in listing. Flagged for enforcement action.',
      postedTime: randomDate(),
    },
    {
      title: 'Banteng (Tembadau) Whole Carcass — Fresh Kill',
      description: 'Bos javanicus, whole carcass available. East Java sourced. Jungle beef with excellent marbling unlike farmed cattle. Can arrange cold transport via freight vendor. Very fresh.',
      seller: 'Exotic_Game_ID',
      url: 'https://example.com/listing/b1',
      platformId: plat3.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 99,
      explanation: 'Direct match on Bos javanicus (Banteng) scientific name and "Tembadau" — a coded regional name used to disguise Banteng carcass sales. CITES Appendix I. Highest priority intercept.',
      matchedWords: JSON.stringify(['Banteng', 'Tembadau', 'Jungle beef']),
      archivedText: 'Listing archived immediately. Seller account suspended.',
      status: 'FLAGGED',
      analystNotes: 'Seller IP traced to East Java. Coordinates sent to TRAFFIC Southeast Asia for field verification.',
      postedTime: randomDate(),
    },
    {
      title: 'Wild Buffalo Horn Pair — Decorative Display',
      description: 'Beautiful matched wild buffalo horn pair. Not from farmed animals — genuine forest variety, harvested traditionally. Great for interior decoration or cultural ceremonial use.',
      seller: 'Heritage_Crafts_BD',
      url: 'https://example.com/listing/wb2',
      platformId: plat1.id,
      riskLevel: 'HIGH_RISK',
      confidenceScore: 87,
      explanation: 'Matched "wild buffalo" and "buffalo horn". Seller explicitly states non-farmed, forest origin — a strong trafficking indicator. May refer to Bubalus arnee which is CITES protected.',
      matchedWords: JSON.stringify(['Wild buffalo', 'Buffalo horn']),
      archivedText: 'Listing active at time of capture.',
      status: 'ACTIVE',
      analystNotes: '',
      postedTime: randomDate(),
    },
    {
      title: 'Rare exotic beef — jungle sourced, premium cut',
      description: 'Wild beef from protected forest. Not your normal supermarket cut — rich and gamey flavour profile. Self-sufficient jungle harvest. SE Asia shipping only. Message before buy.',
      seller: 'ForestHarvest88',
      url: 'https://example.com/listing/eb1',
      platformId: plat2.id,
      riskLevel: 'SUSPICIOUS',
      confidenceScore: 74,
      explanation: 'Coded phrases "jungle beef", "wild beef" and reference to "protected forest" in context suggest possible Gaur or Banteng bushmeat. Requires manual species identification review.',
      matchedWords: JSON.stringify(['Jungle beef', 'Wild beef', 'Bushmeat']),
      archivedText: 'Listing active.',
      status: 'ACTIVE',
      analystNotes: '',
      postedTime: randomDate(),
    },
  ]

  for (const l of listings) {
    await prisma.listing.create({ data: l })
  }

  console.log(`✅ Wild cattle data seeded: ${cattleKeywords.length} keywords + ${listings.length} listings`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
