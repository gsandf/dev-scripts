module.exports = {
  presets: [
    [
      '@babel/preset-stage-1',
      {
        decoratorsLegacy: true
      }
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
};
