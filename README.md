# Feature Flag

## Installation

```yarn add ...```

## Usage

### Prepare Feature Flag Config

```javascript
const config = [{
    name: 'Light Mode',
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
  }
]
```
#### Config Item

| property     | type   | required | description                                            |
|--------------|--------|----------|--------------------------------------------------------|
| name         | string |    Yes   | Flag's name. It will be written on Flag Panel          |
| id           | string |    Yes   | Unique property for flag                               |
| defaultValue | string |    No    | You can use it when you need default value for flag    |
| options      | array  |    No    | Array of object, which holds options' names and values |


### Feature Flag Provider
Wrap your root component with `FeatureFlagProvider` and pass your config to it with the `config` prop.

```javascript
import { FeatureFlagProvider } from './FeatureFlag';

ReactDOM.render(
  <FeatureFlagProvider config={featureConfig}>
    <App />
  </FeatureFlagProvider>,
  document.getElementById('root')
);
```
#### FeatureFlagProvider Props

| property       | type   | required | description                     |
|----------------|--------|----------|---------------------------------|
| config         | object |    No    | Array of config item            |
| isPanelVisible | bool   |    No    | Set false to hide feature panel |


### How to get flag value from inside of the React Component
Use `useFeatureFlag` hook for reaching flag value from `React Component`. You can pass it string(`flag id`) or array of string(`flag id`).

```javascript
import { useFeatureFlag } from './FeatureFlag';

function App() {
  const showIcon = useFeatureFlag('showIcon');
  const [lightMode] = useFeatureFlag(['lightMode']);

  return (
    <div className="App">
      <header className={`App-header${lightMode ? ' light' : ''}`}>
        {showIcon && <img src={logo} className="App-logo" alt="logo" style={{ alignSelf: showIcon }} />}
      </header>
    </div>
  );
}
```


### How to get flag value from outside of the React Component
Use `getFeatureFlag` function for reaching flag value wherever you want. You can pass it string(`flag id`) or array of string(`flag id`).

```javascript
import { getFeatureFlag } from './FeatureFlag';

const calculate = () => {
  return getFeatureFlag('coefficient') * value;
}
```

## Feature Flag Panel

If the flag value is changed from `Featuer Flag Panel`. Its value will be written to your localstorage. So It wont be reset after refreshing the browser.
