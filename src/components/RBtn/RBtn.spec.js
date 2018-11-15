import { test } from '@util/testing';
import Vue from 'vue';
import RBtn from '@components/RBtn';
import RLoading from '@components/RLoading';

const stub = {
  name: 'router-link',
  render: h => h('button')
};

test('RBtn.vue', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(RBtn);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color prop and match snapshot', () => {
    const wrapper1 = mount(RBtn, {
      propsData: {
        color: 'accent'
      }
    });

    expect(wrapper1.html()).toMatchSnapshot();

    const wrapper2 = mount(RBtn, {
      propsData: {
        color: 'accent',
        flat: true
      }
    });

    expect(wrapper2.html()).toMatchSnapshot();
  });

  it('should render component with loader slot and match snapshot', () => {
    const wrapper = mount(RBtn, {
      propsData: {
        loading: true
      },
      slots: {
        loader: [ compileToFunctions('<span>loader</span>') ]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with loader and match snapshot', () => {
    const wrapper = mount(RBtn, {
      components: {
        RLoading
      },
      propsData: {
        loading: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an <a> tag when using href prop', () => {
    const wrapper = mount(RBtn, {
      propsData: {
        href: 'http://www.google.com'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.getAttribute('href')).toBe('http://www.google.com');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a <button> tag when using to prop', () => {
    const instance = Vue.extend();
    instance.component('router-link', stub);

    const wrapper = mount(RBtn, {
      propsData: {
        to: '/home'
      },
      instance
    });

    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.vm.$props.to).toBe('/home');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render specified tag when using tag prop', () => {
    const wrapper = mount(RBtn, {
      propsData: {
        tag: 'a'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should register and unregister', () => {
    const register = jest.fn();
    const unregister = jest.fn();

    const wrapper = mount(RBtn, {
      provide: {
        buttonGroup: {
          register: register,
          unregister: unregister
        }
      }
    });

    expect(register).toHaveBeenCalled();
    wrapper.destroy();
    expect(unregister).toHaveBeenCalled();
  });

  it('should emit a click event', async () => {
    const instance = Vue.extend();
    instance.component('router-link', stub);

    const wrapper = mount(RBtn, {
      propsData: {
        href: '#!'
      },
      instance
    });

    const click = jest.fn();
    wrapper.vm.$on('click', click);
    wrapper.trigger('click');

    wrapper.setProps({ href: undefined, to: '/foo' });
    wrapper.trigger('click');

    expect(click.mock.calls.length).toBe(2);
  });

  it('should use custom active-class', () => {
    const wrapper = mount(RBtn, {
      propsData: {
        inputValue: true,
        activeClass: 'foo'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
