import Vue from 'vue';
import transitions from '@components/transitions';
import RDialog from '@components/RDialog';
import { test } from '@util/testing';

Vue.use(transitions);

test('RDialog.vue', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(RDialog);

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a disabled component and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a persistent component and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        persistent: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a fullscreen component and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        fullscreen: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a lazy component and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        lazy: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a scrollable component and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        scrollable: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render component with custom origin and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        origin: 'top right'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render component with custom width (max-width) and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        maxWidth: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(RDialog, {
      propsData: {
        transition: 'fade-transition'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should open dialog on activator click', async () => {
    const input = jest.fn();
    const wrapper = mount(RDialog, {
      slots: {
        activator: [ compileToFunctions('<span>activator</span>') ]
      }
    });

    wrapper.vm.$on('input', input);

    expect(wrapper.vm.isActive).toBe(false);
    wrapper.find('.dialog__activator')[0].trigger('click');
    expect(wrapper.vm.isActive).toBe(true);
    await wrapper.vm.$nextTick();
    expect(input).toBeCalledWith(true);

    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('not should open disabed dialog on activator click', async () => {
    const input = jest.fn();
    const wrapper = mount(RDialog, {
      propsData: {
        disabled: true
      },
      slots: {
        activator: [ compileToFunctions('<span>activator</span>') ]
      }
    });

    wrapper.vm.$on('input', input);

    expect(wrapper.vm.isActive).toBe(false);
    wrapper.find('.dialog__activator')[0].trigger('click');
    expect(wrapper.vm.isActive).toBe(false);
    await wrapper.vm.$nextTick();
    expect(input).not.toBeCalled();

    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('not change state on v-model update', async () => {
    const wrapper = mount(RDialog, {
      propsData: {
        value: false
      },
      slots: {
        activator: [ compileToFunctions('<span>activator</span>') ]
      }
    });

    expect(wrapper.vm.isActive).toBe(false);

    wrapper.setProps({
      value: true
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isActive).toBe(true);

    wrapper.setProps({
      value: false
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isActive).toBe(false);

    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should emit keydown event', async () => {
    const keydown = jest.fn();
    const component = {
      render: h => h(RDialog, {
        props: {
          value: true
        },
        on: {
          keydown
        }
      })
    };
    mount(component);

    window.dispatchEvent(new Event('keydown'));
    expect(keydown).toBeCalled();

    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });
});
