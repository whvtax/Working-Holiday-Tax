import { LinkAfterPayment, linkAfterPaymentMetadata } from '@/components/ui/LinkAfterPayment'

export const metadata = linkAfterPaymentMetadata('de')

export default function LinkAfterPaymentPage() {
  return <LinkAfterPayment lang="de" />
}
