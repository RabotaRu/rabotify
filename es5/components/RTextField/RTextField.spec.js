'use strict';

var _testing = require('@util/testing');

var _vue = require('vue/dist/vue.common');

var _vue2 = _interopRequireDefault(_vue);

var _transitions = require('@components/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _RTextField = require('@components/RTextField');

var _RTextField2 = _interopRequireDefault(_RTextField);

var _MdAccountBox = require('@md-svg-vue/action/MdAccountBox.vue');

var _MdAccountBox2 = _interopRequireDefault(_MdAccountBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_vue2.default.use(_transitions2.default);

// eslint-disable-next-line max-statements
(0, _testing.test)('RTextField.vue', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(_RTextField2.default);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass events to internal input field', function () {
    var keyup = jest.fn();
    var component = {
      render: function render(h) {
        return h(_RTextField2.default, { on: { keyUp: keyup }, props: { download: '' }, attrs: {} });
      }
    };
    var wrapper = mount(component);

    var input = wrapper.find('input')[0];
    input.trigger('keyUp', { keyCode: 65 });

    expect(keyup).toBeCalled();
  });

  it('should render aria-label attribute on text field element with label value and no id', function () {
    var wrapper = mount(_RTextField2.default, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    });

    var inputGroup = wrapper.find('input')[0];
    expect(inputGroup.getAttribute('aria-label')).toBe('Test');
  });

  it('should not render aria-label attribute on text field element with no label value or id', function () {
    var wrapper = mount(_RTextField2.default, {
      propsData: {
        label: null
      },
      attrs: {}
    });

    var inputGroup = wrapper.find('input')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
  });

  it('should not render aria-label attribute on text field element with id', function () {
    var wrapper = mount(_RTextField2.default, {
      propsData: {
        label: 'Test'
      },
      attrs: {
        id: 'Test'
      }
    });

    var inputGroup = wrapper.find('input')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
  });

  it('should start out as invalid', function () {
    var wrapper = mount(_RTextField2.default, {
      propsData: {
        rules: [function (v) {
          return !!v || 'Required';
        }]
      }
    });

    expect(wrapper.data().valid).toEqual(false);
  });

  it('should start validating on input', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {});


            expect(wrapper.data().shouldValidate).toEqual(false);
            wrapper.setProps({ value: 'asd' });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.data().shouldValidate).toEqual(true);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should not start validating on input if validate-on-blur prop is set', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: {
                validateOnBlur: true
              }
            });


            expect(wrapper.data().shouldValidate).toEqual(false);
            wrapper.setProps({ value: 'asd' });
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.data().shouldValidate).toEqual(false);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('should not display counter when set to false', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: {
                counter: true,
                max: 50
              }
            });


            expect(wrapper.find('.input-group__counter')[0]).not.toBe(undefined);
            expect(wrapper.html()).toMatchSnapshot();

            wrapper.setProps({ counter: false });
            _context3.next = 6;
            return wrapper.vm.$nextTick();

          case 6:

            expect(wrapper.html()).toMatchSnapshot();
            expect(wrapper.find('.input-group__counter')[0]).toBe(undefined);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should have readonly attribute', function () {
    var wrapper = mount(_RTextField2.default, {
      propsData: {
        readonly: true
      }
    });

    var input = wrapper.find('input')[0];

    expect(input.getAttribute('readonly')).toBe('readonly');
  });

  it('should clear input value', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var wrapper, clear, input;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: {
                clearable: true,
                value: 'foo'
              }
            });
            clear = wrapper.find('.input-group__append-icon')[0];
            input = jest.fn();

            wrapper.vm.$on('input', input);

            expect(wrapper.vm.inputValue).toBe('foo');

            clear.trigger('click');

            _context4.next = 8;
            return wrapper.vm.$nextTick();

          case 8:

            expect(input).toHaveBeenCalledWith(null);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('should not clear input if not clearable and has appended icon (with callback)', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var appendIconCb, wrapper, icon;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            appendIconCb = jest.fn();
            wrapper = mount(_RTextField2.default, {
              propsData: {
                value: 'foo',
                appendIconCb: appendIconCb
              },
              slots: {
                appendIcon: [_MdAccountBox2.default]
              }
            });
            icon = wrapper.find('.input-group__append-icon')[0];

            icon.trigger('click');
            _context5.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.vm.inputValue).toBe('foo');
            expect(appendIconCb.mock.calls).toHaveLength(1);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('should not clear input if not clearable and has appended icon (without callback)', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: {
                value: 'foo'
              },
              slots: {
                appendIcon: [_MdAccountBox2.default]
              }
            });
            icon = wrapper.find('.input-group__append-icon')[0];

            icon.trigger('click');
            _context6.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.inputValue).toBe('foo');

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  it('should start validating on blur', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {});
            input = wrapper.find('input')[0];

            expect(wrapper.data().shouldValidate).toEqual(false);
            input.trigger('focus');
            _context7.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            input.trigger('blur');
            _context7.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.data().shouldValidate).toEqual(true);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  it('should keep its value on blur', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: {
                value: 'asd'
              }
            });
            input = wrapper.find('input')[0];


            input.element.value = 'fgh';
            input.trigger('input');
            input.trigger('blur');

            expect(input.element.value).toBe('fgh');

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  it('should update if value is changed externally', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {});
            input = wrapper.find('input')[0];


            wrapper.setProps({ value: 'fgh' });
            expect(input.element.value).toBe('fgh');

            input.trigger('focus');
            wrapper.setProps({ value: 'jkl' });
            expect(input.element.value).toBe('jkl');

          case 7:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));

  it('should fire a single change event on blur', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var value, change, component, wrapper, input;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            value = 'asd';
            change = jest.fn();
            component = {
              render: function render(h) {
                return h(_RTextField2.default, {
                  on: {
                    input: function input(i) {
                      return value = i;
                    },
                    change: change
                  },
                  props: { value: value }
                });
              }
            };
            wrapper = mount(component);
            input = wrapper.find('input')[0];


            input.trigger('focus');
            _context10.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            input.element.value = 'fgh';
            input.trigger('input');

            _context10.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            input.trigger('blur');
            _context10.next = 15;
            return wrapper.vm.$nextTick();

          case 15:

            expect(change).toBeCalledWith('fgh');
            expect(change.mock.calls).toHaveLength(1);

          case 17:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  it('should not emit change event if value has not changed', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var change, value, component, wrapper, input;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            change = jest.fn();
            value = 'test';
            component = {
              render: function render(h) {
                return h(_RTextField2.default, {
                  on: {
                    input: function input(i) {
                      return value = i;
                    },
                    change: change
                  },
                  props: { value: value }
                });
              }
            };
            wrapper = mount(component);
            input = wrapper.find('input')[0];


            input.trigger('focus');
            _context11.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            input.trigger('blur');
            _context11.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            expect(change.mock.calls).toHaveLength(0);

          case 12:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));

  it('should display the number 0', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: { value: 0 }
            });


            expect(wrapper.vm.$refs.input.value).toBe('0');

          case 2:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  it('should reset internal change on blur', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            wrapper = mount(_RTextField2.default);


            wrapper.setProps({ value: 'foo' });
            wrapper.vm.internalChange = true;
            _context13.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.vm.internalChange).toBe(true);
            wrapper.vm.blur();
            _context13.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.vm.internalChange).toBe(false);

          case 10:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  })));

  it('should calculate element height when using auto-grow prop', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var value, component, wrapper, input;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            value = '';
            component = {
              render: function render(h) {
                return h(_RTextField2.default, {
                  on: {
                    input: function input(i) {
                      return value = i;
                    }
                  },
                  props: {
                    value: value,
                    multiLine: true,
                    autoGrow: true
                  }
                });
              }
            };
            wrapper = mount(component);
            input = wrapper.find('textarea')[0];


            input.trigger('focus');
            _context14.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            input.element.value = 'this is a really long text that should hopefully make auto-grow kick in. maybe?';
            input.trigger('input');
            _context14.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            expect(wrapper.html()).toMatchSnapshot();
            expect(input.element.style.getPropertyValue('height').length).not.toBe(0);

          case 13:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));

  it('should match multi-line snapshot', function () {
    var wrapper = mount(_RTextField2.default, {
      propsData: {
        multiLine: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match textarea snapshot', function () {
    var wrapper = mount(_RTextField2.default, {
      propsData: {
        textarea: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match auto-grow snapshot', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: {
                textarea: true,
                autoGrow: true
              }
            });
            _context15.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            expect(wrapper.html()).toMatchSnapshot();

          case 4:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));

  it('should render no-resize the same if already auto-grow', function () {
    var wrappers = [{ autoGrow: true, multiLine: true }, { autoGrow: true, textarea: true }].map(function (propsData) {
      return mount(_RTextField2.default, { propsData: propsData });
    });

    wrappers.forEach(function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(wrapper) {
        var html1, html2;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return wrapper.vm.$nextTick();

              case 2:
                html1 = wrapper.html();


                wrapper.setProps({ noResize: true });
                // will still pass without this, do not remove
                _context16.next = 6;
                return wrapper.vm.$nextTick();

              case 6:
                html2 = wrapper.html();


                expect(html2).toBe(html1);

              case 8:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, undefined);
      }));

      return function (_x) {
        return _ref17.apply(this, arguments);
      };
    }());
  });

  it('should always show details when preserveDetails is `true`', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
    var wrapper, details;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            wrapper = mount(_RTextField2.default, {
              propsData: {
                value: '123',
                rules: [function (v) {
                  return !!v || 'Required';
                }],
                preserveDetails: true
              }
            });


            expect(wrapper.data().valid).toEqual(true);

            details = wrapper.find('.input-group__details')[0];
            _context17.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(details.element.style.display).not.toBe('none');

            expect(wrapper.html()).toMatchSnapshot();

          case 7:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});