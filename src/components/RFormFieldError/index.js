import RFormFieldError from './RFormFieldError.vue';

export { RFormFieldError };

/* istanbul ignore next */
RFormFieldError.install = function install (Vue) {
  Vue.component('r-form-field-error', RFormFieldError);
};

export default RFormFieldError;
