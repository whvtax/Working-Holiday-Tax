import styles from './Button.module.css'

interface LinkButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  href: string
  size?: 'lg' | 'md'
  /** Shrink to its content instead of filling the row. */
  inline?: boolean
  children: React.ReactNode
}

/** The one primary action on SVT: an ink button. External links (wa.me) open
 *  in the same tab on purpose, so the phone hands over to WhatsApp. */
export function LinkButton({ href, size = 'lg', inline = false, children, ...rest }: LinkButtonProps) {
  return (
    <a href={href} className={[styles.button, styles[size], inline ? styles.inline : ''].join(' ')} {...rest}>
      {children}
    </a>
  )
}
