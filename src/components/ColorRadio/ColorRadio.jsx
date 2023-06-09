import cls from 'classnames'

const ColorRadio = ({ children, utilClassNames, ...restProps }) => {
  const classNames = cls('color-radio', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return <div className={classNames}>{children}</div>
}

export default ColorRadio
