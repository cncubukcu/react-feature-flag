const featureConfig = [{
  name: 'First App Feature - Light Mode',
  id: 'lightMode',
  defaultValue: false,
}, {
  name: 'Show icon',
  id: 'showIcon',
  options: [{
    name: 'Right',
    value: 'flex-start',
  }, {
    name: 'Center',
    value: 'center',
  }, {
    name: 'Left',
    value: 'flex-end',
  }],
  defaultValue: 'flex-start'
}];

export default featureConfig;
