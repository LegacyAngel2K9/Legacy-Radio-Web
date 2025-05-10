export const products = {
  '12_months': {
    id: 'prod_SHdKozvTiLSmZ2',
    priceId: 'price_1RN43mPAKLPhJwayslaQrQU7',
    name: '12 Months',
    description: 'Annual subscription to Legacy Radio voice servers',
    mode: 'subscription' as const,
  },
  '6_months': {
    id: 'prod_SHdKQnbFBPpfpP',
    priceId: 'price_1RN43cPAKLPhJwayfxCY3dax',
    name: '6 Months',
    description: '6-month subscription to Legacy Radio voice servers',
    mode: 'subscription' as const,
  },
  '3_months': {
    id: 'prod_SHdJQFStVhD7PV',
    priceId: 'price_1RN43MPAKLPhJway6y1vc72V',
    name: '3 Months',
    description: '3-month subscription to Legacy Radio voice servers',
    mode: 'subscription' as const,
  },
  '1_month': {
    id: 'prod_SHdJabcF2vQuE1',
    priceId: 'price_1RN430PAKLPhJway8YUDfAXR',
    name: '1 Month',
    description: 'Monthly subscription to Legacy Radio voice servers',
    mode: 'subscription' as const,
  },
} as const;

export type ProductId = keyof typeof products;