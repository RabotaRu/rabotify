import { normalizeClassName } from '../../util/helpers';

export default function Grid (name) {
  return {
    name: `r-${name}`,

    functional: true,

    props: {
      id: String,
      tag: {
        type: String,
        default: 'div'
      }
    },

    render: (h, { props, data, children }) => {
      data.staticClass = normalizeClassName(`${name} ${data.staticClass || ''}`);

      if (data.attrs) {
        const classes = Object.keys(data.attrs).filter(key => {
          const value = data.attrs[key];
          return value || typeof value === 'string';
        });

        if (classes.length) {
          data.staticClass = normalizeClassName(data.staticClass + ` ${classes.join(' ')}`);
        }
        delete data.attrs;
      }

      if (props.id) {
        data.domProps = data.domProps || {};
        data.domProps.id = props.id;
      }

      return h(props.tag, data, children);
    }
  };
}
