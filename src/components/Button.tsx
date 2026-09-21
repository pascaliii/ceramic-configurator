import cls from 'classnames'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  outline?: boolean
  link?: boolean
  loading?: boolean
  utilClassNames?: string
}

const Button = ({
  label,
  outline,
  link,
  disabled,
  loading,
  utilClassNames,
  onClick,
  ...restProps
}: ButtonProps) => {
  const classNames = cls('btn', {
    'btn--outline': outline,
    'btn--link': link,
    'btn--disabled': disabled,
    'btn--loading': loading,
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <button className={classNames} onClick={onClick} disabled={disabled} {...restProps}>
      {label}
    </button>
  )
}

export default Button
