module.exports = {
    presets: [
      ['env', {
        targets: {
          node: 'current'
        }
      }],
      'stage-2'
    ],
    plugins: [
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
};
