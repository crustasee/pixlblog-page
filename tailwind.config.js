module.exports = {
  content: [
    './src/**/*.njk',
    './src/**/*.svg',
    './src/assets/js/*.js'
  ],
  screens: {
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Consolas', '"Liberation Mono"', 'Menlo', '"Courier New"', 'monospace'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
        heading: ['"JetBrains Mono"', 'monospace'],
        body: ['Consolas', '"Liberation Mono"', 'monospace']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: '"JetBrains Mono", monospace',
              color: theme('colors.slate.900')
            },
            'h2': {
              marginTop: '2em',
              marginBottom: '0.8em',
              fontWeight: '700'
            },
            'h3': {
              marginTop: '1.6em',
              marginBottom: '0.6em',
              fontWeight: '600'
            },
            'p': {
              fontFamily: 'Consolas, "Liberation Mono", Menlo, "Courier New", monospace',
              lineHeight: '1.8',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              fontSize: '1rem',
              color: theme('colors.slate.700')
            },
            'ul, ol': {
              fontFamily: 'Consolas, "Liberation Mono", Menlo, "Courier New", monospace',
              lineHeight: '1.75',
              color: theme('colors.slate.700')
            },
            'li': {
              marginTop: '0.4em',
              marginBottom: '0.4em'
            },
            'table': {
              fontFamily: 'Consolas, "Liberation Mono", Menlo, "Courier New", monospace',
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1.75em',
              marginBottom: '1.75em'
            },
            'th': {
              fontFamily: '"JetBrains Mono", monospace',
              backgroundColor: theme('colors.slate.100'),
              padding: '0.75rem 1rem',
              borderWidth: '1px',
              borderColor: theme('colors.slate.200'),
              textAlign: 'left',
              fontSize: '0.875rem'
            },
            'td': {
              padding: '0.75rem 1rem',
              borderWidth: '1px',
              borderColor: theme('colors.slate.200'),
              fontSize: '0.875rem',
              lineHeight: '1.6'
            },
            'blockquote': {
              fontWeight: 'normal',
              color: theme('colors.slate.600')
            },
            'blockquote p:first-of-type::before': {
              content: ''
            },
            'blockquote p:last-of-type::after': {
              content: ''
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
