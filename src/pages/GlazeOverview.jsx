import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Button from '../components/Button'
import Select from '../components/Select/Select'

import Input from '../components/Input'
import FormGroup from '../components/FormGroup'
import Radio from '../components/Radio/Radio'

const GlazeOverview = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Header title='Pascale Schmidt Ceramics' fullwidth>
        <Header.Item>Configurator</Header.Item>
        <Header.Item active>Glazes</Header.Item>
        <Header.Item>How to?</Header.Item>
      </Header>

      {/* <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        style={{ width: '100px', height: '300px', backgroundColor: 'black' }}
      >
        <Portal>
          <DialogBackdrop />
          <DialogContainer>
            <DialogContent>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>Dialog Description</DialogDescription>
              <DialogCloseTrigger>Close</DialogCloseTrigger>
            </DialogContent>
          </DialogContainer>
        </Portal>
      </Dialog> */}
      <div style={{ width: '400px' }}>
        <FormGroup label='Manufacturer'>
          <Select>
            <Select.Option value=''>Select manufacturer</Select.Option>
            <Select.Option value=''>Botz</Select.Option>
            <Select.Option value=''>Mayco</Select.Option>
            <Select.Option value=''>Carl Jäger</Select.Option>
          </Select>
        </FormGroup>
        <FormGroup label='Enter glaze name'>
          <Input placeholder='Glaze name' type='text' />
        </FormGroup>
        <FormGroup label='Enter article Number'>
          <Input placeholder='Article Number' type='text' />
        </FormGroup>
        <FormGroup label='Firing Range (in °C)'>
          <Input placeholder='min' type='text' />
          <Input placeholder='max' type='text' />
        </FormGroup>
        <FormGroup label='Firing Method'>
          <Radio>
            <Radio.Option name='firingMethod' value='1' id='1' />
          </Radio>
        </FormGroup>
        <FormGroup label='Surface'></FormGroup>
        <FormGroup label='Opacity'></FormGroup>
      </div>
      <Button label={'+ Add new glaze'} />
      <Button outline label={'Load more'} />
    </>
  )
}

export default GlazeOverview
