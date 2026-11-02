import styles from './Button.module.css'

interface LinkButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  href: string
  size?: 'lg' | 'md'
  /** 'light' is a white button for forest bands. */
  tone?: 'forest' | 'light'
  inline?: boolean
  children: React.ReactNode
}

/** The one primary action on WHT: a forest pill (WhatsApp links keep their tracking attributes via ...rest). */
export function LinkButton({ href, size = 'lg', tone = 'forest', inline = false, children, ...rest }: LinkButtonProps) {
  return (
    <a href={href} className={[styles.button, styles[size], tone === 'light' ? styles.light : '', inline ? styles.inline : ''].join(' ')} {...rest}>
      {children}
    </a>
  )
}
