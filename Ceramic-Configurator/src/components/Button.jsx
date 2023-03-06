import cls from 'classnames'

const Button = ({
  label,
  outline,
  link,
  disabled,
  loading,
  utilClassNames,
  onClick,
  ...restProps
}) => {
  const classNames = cls('btn', {
    'btn--outline': outline,
    'btn--link': link,
    'btn--disabled': disabled,
    'btn--loading': loading,
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <button className={classNames} onClick={onClick} {...restProps}>
      {label}
    </button>
  )
}

export default Button
