module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    // отключим правила, которые не нужно применять к существующему проекту
    "no-console": "off", // используется
    "space-in-parens": "off", // в вызове метода всегда делаем внутри отступы
    "camelcase": "off", // порой нарушаем
    "import/order": "off", // бесполезная
    "require-await": "off", // вообще опасная проверка, надо понимать, что async-функция всегда вернёт промис, даже при исключении. Если убрать и функция выкинет исключение до создания промиса - внешний код должен перехватить исключение.
    "vue/require-component-is": 'off', // чтобы можно было у component ставить просто v-bind
    "vue/no-v-html": 'off', // нам необходим этот аттрибут


    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // set maximum line characters
    'max-len': [2, 140, 4, {'ignoreUrls': true, 'ignoreTemplateLiterals': true, 'ignoreStrings': true}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-return-assign': 0,
    // disallow indentation using both tabs and spaces
    'no-mixed-spaces-and-tabs': 2,
    // ensure consistent 2 space indentation and indent cases under switch
    'indent': [2, 2, {'SwitchCase': 1}],
    'object-curly-spacing': [2, 'always'],
    'max-statements': [2, 24],
    "semi": [2, "always"],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],

    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'never',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': true,
      'ignores': []
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],

    'vue/order-in-components': ['error', {
      'order': [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'fetch',
        'asyncData',
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        'head',
        ['template', 'render'],
        'renderError'
      ]
    }],
    "vue/attributes-order": ["error", {
      "order": [
        "DEFINITION",
        "LIST_RENDERING",
        "CONDITIONALS",
        "RENDER_MODIFIERS",
        "GLOBAL",
        "UNIQUE",
        "TWO_WAY_BINDING",
        "OTHER_DIRECTIVES",
        "OTHER_ATTR",
        "CONTENT",
        "EVENTS"
      ]
    }]
  }
}
