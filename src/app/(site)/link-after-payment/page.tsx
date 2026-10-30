import { LinkAfterPayment, linkAfterPaymentMetadata } from '@/components/ui/LinkAfterPayment'

export const metadata = linkAfterPaymentMetadata('en')

export default function LinkAfterPaymentPage() {
  return <LinkAfterPayment lang="en" />
}
