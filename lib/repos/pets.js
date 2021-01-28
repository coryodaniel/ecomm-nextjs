// TODO: Description and inventory units
const fakePetDb = [
  {
    id: "nervous-ned",
    sku: "ned-xs-9000",
    price: 49.99,
    name: "Nervous Ned",
    photo: "https://images.dog.ceo/breeds/maltese/n02085936_7272.jpg"
  },
  {
    id: "princess-pufferton",
    sku: "puffer-xl-4200",
    price: 399.49,
    name: "Princess Pufferton",
    photo: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_6875.jpg"
  },
  {
    id: "bully-bill",
    sku: "bill-xs-1337",
    price: 109.99,
    name: "Bully Bill",
    photo: "https://images.dog.ceo/breeds/bulldog-boston/n02096585_11427.jpg"
  },
  {
    id: "marge-the-mop",
    sku: "marge-s-4444",
    price: 99.99,
    name: "Marge the Mop",
    photo: "https://images.dog.ceo/breeds/pomeranian/n02112018_7019.jpg"
  }
]

export function getAllIDs() {
  return fakePetDb.map(pet => {
    return { params: { id: pet.id } }
  })
}

export function findBySKU(sku) {
  const foundPet = fakePetDb.find(pet => {
    return pet.sku == sku
  })

  return foundPet
}

export function findByID(id) {
  const foundPet = fakePetDb.find(pet => {
    return pet.id == id.toLowerCase()
  })

  return foundPet
}

export function getAllPetsData() {
  return fakePetDb
}