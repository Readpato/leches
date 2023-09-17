import { mount } from '@vue/test-utils'
import { TresLeches, useControls } from '/@/'
import { it, expect } from 'vitest'
import { defineComponent, nextTick } from 'vue'


describe('Boolean Control', async () => {
  it('should render a boolean control', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { value: test } = useControls({ test: true })
        return {
          test
        }
      }
    })

    const wrapper = mount(component, {
    /*    attachTo: document.body, */
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').attributes('type')).toBe('checkbox')
  })
  it('should render a boolean control with a label', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      components: {
        TresLeches
      },
      setup() {
        const { value:test } = useControls({ test: true })
        return {
          test
        }
      }
    })

    const wrapper = mount(component, {
    /*    attachTo: document.body, */
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('label').text()).toBe('test')
  })
  it('should change the value of the control when the input changes', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value:test } = useControls({ test: true })
        return {
          test
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const checkboxInput = wrapper.find('input[type="checkbox"]')

    await checkboxInput.setChecked(false)
    await nextTick();

    expect(wrapper.vm.test).toBe(false)
  })
  it('should hide the control when the visible property is toggled', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { value: test, visible } = useControls({ test: true })
        return {
          test,
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    wrapper.vm.visible = false
    await nextTick();
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(false)
  })
  it('should show the control by default', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { visible } = useControls({ test: true })
        return {
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const checkboxInput = wrapper.find('input[type="checkbox"]')
    expect(checkboxInput.exists()).toBe(true)

    expect(wrapper.vm.visible).toBe(true)
  })
  it('should not show the control if the visibility is initially false', async ()=> {
    const component = defineComponent({
      template: `
        <TresLeches />
      `,
      setup() {
        const { visible } = useControls({ test: {
          value: true,
          visible: false
        } })
        return {
          visible
        }
      }
    })

    const wrapper = mount(component, {
      components: {
        TresLeches
      },
    })
    const checkboxInput = wrapper.find('input[type="checkbox"]')
    expect(checkboxInput.exists()).toBe(false)

    expect(wrapper.vm.visible).toBe(false)
  })
})