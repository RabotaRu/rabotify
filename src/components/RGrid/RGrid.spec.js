import { test } from '@util/testing';
import RFlex from '@components/RGrid/RFlex.vue';
import RLayout from '@components/RGrid/RLayout.vue';

test('RFlex', ({ mount, functionalContext }) => {
  it('should conditionally apply if boolean is used', () => {
    const wrapper = mount(RFlex, functionalContext({
      attrs: {
        foo: '',
        bar: false
      }
    }));

    expect(wrapper.hasAttribute('foo')).toBe(false);
    expect(wrapper.hasAttribute('bar')).toBe(false);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.hasClass('bar')).toBe(false);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass the id attr', () => {
    const wrapper = mount(RFlex, functionalContext({
      attrs: {
        id: 'test'
      }
    }));

    expect(wrapper.find('#test')).toHaveLength(1);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should apply different size of element', () => {
    const flex = mount(RFlex, functionalContext({
      attrs: {
        'd-flex': true,
        'xs-12': true,
        'sm-and-down-7': true
      },
      domProps: {
        innerHTML: 'Text'
      }
    }));

    const wrapper = mount(RLayout, functionalContext({
      attrs: {
        row: true,
        wrap: true
      }
    }));

    wrapper.element.appendChild(flex.element);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
