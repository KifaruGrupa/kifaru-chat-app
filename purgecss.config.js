const PurgecssJs = content => (content.match(/[A-z0-9-:\/]+/g) || [])

module.exports = {
  content: ['src/App.js'],
  css: ['src/styles/tailwind.css', 'src/styles/custom/index.css'],
  whitelistPatterns: [/chat-.*/], //js generated css classes should be prefixed with 'chat-'
  extractors: [
    {
      extractor: PurgecssJs,
      extensions: ['js', 'jsx']
    }
  ]
}