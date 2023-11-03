import cls from 'classnames'
import ColorRadioItem from './ColorRadioItem'

const ColorRadio = ({ children, utilClassNames, ...restProps }) => {
  const classNames = cls('color-radio', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return <div className={classNames}>{children}</div>
}

ColorRadio.Item = ColorRadioItem

export default ColorRadio
