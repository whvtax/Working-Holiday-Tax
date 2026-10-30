import { LinkAfterPayment, linkAfterPaymentMetadata } from '@/components/ui/LinkAfterPayment'

export const metadata = linkAfterPaymentMetadata('ja')

export default function LinkAfterPaymentPage() {
  return <LinkAfterPayment lang="ja" />
}
