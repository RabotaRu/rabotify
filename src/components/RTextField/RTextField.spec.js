import { test } from '@util/testing';
import Vue from 'vue/dist/vue.common';
import transitions from '@components/transitions';
import RTextField from '@components/RTextField';
import MdAccountBox from '@md-svg-vue/action/MdAccountBox.vue';

Vue.use(transitions);

// eslint-disable-next-line max-statements
test('RTextField.vue', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(RTextField);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass events to internal input field', () => {
    const keyup = jest.fn();
    const component = {
      render (h) {
        return h(RTextField, { on: { keyUp: keyup }, props: { download: '' }, attrs: {} });
      }
    };
    const wrapper = mount(component);

    const input = wrapper.find('input')[0];
    input.trigger('keyUp', { keyCode: 65 });

    expect(keyup).toBeCalled();
  });

  it('should render aria-label attribute on text field element with label value and no id', () => {
    const wrapper = mount(RTextField, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    });

    const inputGroup = wrapper.find('input')[0];
    expect(inputGroup.getAttribute('aria-label')).toBe('Test');
  });

  it('should not render aria-label attribute on text field element with no label value or id', () => {
    const wrapper = mount(RTextField, {
      propsData: {
        label: null
      },
      attrs: {}
    });

    const inputGroup = wrapper.find('input')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
  });

  it('should not render aria-label attribute on text field element with id', () => {
    const wrapper = mount(RTextField, {
      propsData: {
        label: 'Test'
      },
      attrs: {
        id: 'Test'
      }
    });

    const inputGroup = wrapper.find('input')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
  });

  it('should start out as invalid', () => {
    const wrapper = mount(RTextField, {
      propsData: {
        rules: [ (v) => !!v || 'Required' ]
      }
    });

    expect(wrapper.data().valid).toEqual(false);
  });

  it('should start validating on input', async () => {
    const wrapper = mount(RTextField, {});

    expect(wrapper.data().shouldValidate).toEqual(false);
    wrapper.setProps({ value: 'asd' });
    await wrapper.vm.$nextTick();
    expect(wrapper.data().shouldValidate).toEqual(true);
  });

  it('should not start validating on input if validate-on-blur prop is set', async () => {
    const wrapper = mount(RTextField, {
      propsData: {
        validateOnBlur: true
      }
    });

    expect(wrapper.data().shouldValidate).toEqual(false);
    wrapper.setProps({ value: 'asd' });
    await wrapper.vm.$nextTick();
    expect(wrapper.data().shouldValidate).toEqual(false);
  });

  it('should not display counter when set to false', async () => {
    const wrapper = mount(RTextField, {
      propsData: {
        counter: true,
        max: 50
      }
    });

    expect(wrapper.find('.input-group__counter')[0]).not.toBe(undefined);
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.setProps({ counter: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('.input-group__counter')[0]).toBe(undefined);
  });

  it('should have readonly attribute', () => {
    const wrapper = mount(RTextField, {
      propsData: {
        readonly: true
      }
    });

    const input = wrapper.find('input')[0];

    expect(input.getAttribute('readonly')).toBe('readonly');
  });

  it('should clear input value', async () => {
    const wrapper = mount(RTextField, {
      propsData: {
        clearable: true,
        value: 'foo'
      }
    });

    const clear = wrapper.find('.input-group__append-icon')[0];
    const input = jest.fn();
    wrapper.vm.$on('input', input);

    expect(wrapper.vm.inputValue).toBe('foo');

    clear.trigger('click');

    await wrapper.vm.$nextTick();

    expect(input).toHaveBeenCalledWith(null);
  });

  it('should not clear input if not clearable and has appended icon (with callback)', async () => {
    const appendIconCb = jest.fn();
    const wrapper = mount(RTextField, {
      propsData: {
        value: 'foo',
        appendIconCb
      },
      slots: {
        appendIcon: [ MdAccountBox ]
      }
    });

    const icon = wrapper.find('.input-group__append-icon')[0];
    icon.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.inputValue).toBe('foo');
    expect(appendIconCb.mock.calls).toHaveLength(1);
  });

  it('should not clear input if not clearable and has appended icon (without callback)', async () => {
    const wrapper = mount(RTextField, {
      propsData: {
        value: 'foo'
      },
      slots: {
        appendIcon: [ MdAccountBox ]
      }
    });

    const icon = wrapper.find('.input-group__append-icon')[0];
    icon.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.inputValue).toBe('foo');
  });

  it('should start validating on blur', async () => {
    const wrapper = mount(RTextField, {});

    const input = wrapper.find('input')[0];
    expect(wrapper.data().shouldValidate).toEqual(false);
    input.trigger('focus');
    await wrapper.vm.$nextTick();
    input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.data().shouldValidate).toEqual(true);
  });

  it('should keep its value on blur', async () => {
    const wrapper = mount(RTextField, {
      propsData: {
        value: 'asd'
      }
    });

    const input = wrapper.find('input')[0];

    input.element.value = 'fgh';
    input.trigger('input');
    input.trigger('blur');

    expect(input.element.value).toBe('fgh');
  });

  it('should update if value is changed externally', async () => {
    const wrapper = mount(RTextField, {});

    const input = wrapper.find('input')[0];

    wrapper.setProps({ value: 'fgh' });
    expect(input.element.value).toBe('fgh');

    input.trigger('focus');
    wrapper.setProps({ value: 'jkl' });
    expect(input.element.value).toBe('jkl');
  });

  it('should fire a single change event on blur', async () => {
    let value = 'asd';
    const change = jest.fn();

    const component = {
      render (h) {
        return h(RTextField, {
          on: {
            input: (i) => value = i,
            change
          },
          props: { value }
        });
      }
    };
    const wrapper = mount(component);

    const input = wrapper.find('input')[0];

    input.trigger('focus');
    await wrapper.vm.$nextTick();
    input.element.value = 'fgh';
    input.trigger('input');

    await wrapper.vm.$nextTick();
    input.trigger('blur');
    await wrapper.vm.$nextTick();

    expect(change).toBeCalledWith('fgh');
    expect(change.mock.calls).toHaveLength(1);
  });

  it('should not emit change event if value has not changed', async () => {
    const change = jest.fn();
    let value = 'test';
    const component = {
      render (h) {
        return h(RTextField, {
          on: {
            input: i => value = i,
            change
          },
          props: { value }
        });
      }
    };
    const wrapper = mount(component);

    const input = wrapper.find('input')[0];

    input.trigger('focus');
    await wrapper.vm.$nextTick();
    input.trigger('blur');
    await wrapper.vm.$nextTick();

    expect(change.mock.calls).toHaveLength(0);
  });

  it('should display the number 0', async () => {
    const wrapper = mount(RTextField, {
      propsData: { value: 0 }
    });

    expect(wrapper.vm.$refs.input.value).toBe('0');
  });

  it('should reset internal change on blur', async () => {
    const wrapper = mount(RTextField);

    wrapper.setProps({ value: 'foo' });
    wrapper.vm.internalChange = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.internalChange).toBe(true);
    wrapper.vm.blur();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.internalChange).toBe(false);
  });

  it('should calculate element height when using auto-grow prop', async () => {
    let value = '';
    const component = {
      render (h) {
        return h(RTextField, {
          on: {
            input: i => value = i
          },
          props: {
            value,
            multiLine: true,
            autoGrow: true
          }
        });
      }
    };

    const wrapper = mount(component);
    const input = wrapper.find('textarea')[0];

    input.trigger('focus');
    await wrapper.vm.$nextTick();
    input.element.value = 'this is a really long text that should hopefully make auto-grow kick in. maybe?';
    input.trigger('input');
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    expect(input.element.style.getPropertyValue('height').length).not.toBe(0);
  });

  it('should match multi-line snapshot', () => {
    const wrapper = mount(RTextField, {
      propsData: {
        multiLine: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match textarea snapshot', () => {
    const wrapper = mount(RTextField, {
      propsData: {
        textarea: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match auto-grow snapshot', async () => {
    const wrapper = mount(RTextField, {
      propsData: {
        textarea: true,
        autoGrow: true
      }
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render no-resize the same if already auto-grow', () => {
    const wrappers = [
      { autoGrow: true, multiLine: true },
      { autoGrow: true, textarea: true }
    ].map(propsData => mount(RTextField, { propsData }));

    wrappers.forEach(async wrapper => {
      await wrapper.vm.$nextTick();
      const html1 = wrapper.html();

      wrapper.setProps({ noResize: true });
      // will still pass without this, do not remove
      await wrapper.vm.$nextTick();
      const html2 = wrapper.html();

      expect(html2).toBe(html1);
    });
  });

  it('should always show details when preserveDetails is `true`', async () => {
    const wrapper = mount(RTextField, {
      propsData: {
        value: '123',
        rules: [ (v) => !!v || 'Required' ],
        preserveDetails: true
      }
    });

    expect(wrapper.data().valid).toEqual(true);

    const details = wrapper.find('.input-group__details')[0];
    await wrapper.vm.$nextTick();
    expect(details.element.style.display).not.toBe('none');

    expect(wrapper.html()).toMatchSnapshot();
  });
});
