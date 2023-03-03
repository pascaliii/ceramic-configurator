import cls from 'classnames'

const Button = ({
  label,
  outline,
  link,
  utilClassNames,
  onClick,
  ...restProps
}) => {
  const classNames = cls('btn', {
    'btn--outline': outline,
    'btn--link': link,
    [`${utilClassNames}`]: utilClassNames,
  })

  return <button className={classNames}>{label}</button>
}

export default Button
