import RChip from '@components/RChip';
import { test } from '@util/testing';

test('RChip.vue', ({ mount, compileToFunctions }) => {
  it('should have a r-chip class', () => {
    const wrapper = mount(RChip);

    expect(wrapper.hasClass('r-chip')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be removable', () => {
    const wrapper = mount(RChip, {
      propsData: { close: true }
    });

    const close = wrapper.find('.r-chip__close')[0];

    const input = jest.fn(value => wrapper.setProps({ value }));
    wrapper.vm.$on('input', input);

    expect(wrapper.html()).toMatchSnapshot();

    close.trigger('click');
    expect(input).toBeCalledWith(false);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a colored chip', () => {
    const wrapper = mount(RChip, {
      propsData: {
        color: 'secondary',
        textColor: 'accent'
      }
    });

    expect(wrapper.element.classList).toContain('secondary');
    expect(wrapper.element.classList).toContain('text_accent');
  });

  it('should render a disabled chip', () => {
    const wrapper = mount(RChip, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.element.classList).toContain('r-chip_disabled');
  });

  it('should render a colored outline chip', () => {
    const wrapper = mount(RChip, {
      propsData: {
        outline: true,
        color: 'primary'
      }
    });

    expect(wrapper.element.classList).toContain('primary');
    expect(wrapper.element.classList).toContain('text_primary');
  });

  it('should render a colored outline chip with text color', () => {
    const wrapper = mount(RChip, {
      propsData: {
        outline: true,
        color: 'accent',
        textColor: 'info'
      }
    });

    expect(wrapper.element.classList).toContain('accent');
    expect(wrapper.element.classList).toContain('text_info');
  });
});
