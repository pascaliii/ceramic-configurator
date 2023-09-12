import cls from 'classnames'

const FormGroup = ({ label, children, utilClassNames, ...restProps }) => {
  const classNames = cls('formgroup', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames} {...restProps}>
      <label className='formgroup__label'>{label}</label>
      <div className='formgroup__children-wrapper'>{children}</div>
    </div>
  )
}

export default FormGroup
