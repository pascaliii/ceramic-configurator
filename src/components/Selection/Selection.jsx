import cls from 'classnames'
import SelectionItem from './SelectionItem'
import SelectionSpace from './SelectionSpace'

const Selection = ({ headline, children, utilClassNames, ...restProps }) => {
  const classNames = cls('selection', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return <div className={classNames} {...restProps}>
     <h3 className='selection__headline'>{headline}</h3>
     <ul className='selection__list'>
      {children}
     </ul>
    </div>
}

Selection.Item = SelectionItem
Selection.Space = SelectionSpace

export default Selection
