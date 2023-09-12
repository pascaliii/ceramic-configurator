import cls from 'classnames'
import RadioOption from './RadioOption'

const Radio = ({ children, utilClassNames, ...restProps }) => {
  const classNames = cls('radio', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames} {...restProps}>
      {children}
    </div>
  )
}

Radio.Option = RadioOption

export default Radio
