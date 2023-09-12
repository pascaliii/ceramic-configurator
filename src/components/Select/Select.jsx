import cls from 'classnames'
import SelectOption from './SelectOption'

const Select = ({ children, utilClassNames, ...restProps }) => {
  const classNames = cls('select', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <select className={classNames} {...restProps}>
      {children}
    </select>
  )
}
Select.Option = SelectOption

export default Select
