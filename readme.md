## SVGR Fill Replace Babel Plugin
This plugin is to be used as a JSX plugin for [SVGR](https://github.com/smooth-code/svgr).

## Additional documentation
* [Babel Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
* [Babel Types](https://babeljs.io/docs/en/babel-types)

## Usage
Add the package by adding `"babel-plugin-svgr-fill-replace": "github:Exictos-DCS/babel-plugin-svgr-fill-replace",` to your project dependencies.  

In the *svgr* config file add the following:
````javascript
{
  jsx: {
    babelConfig: {
      plugins: [
        ['babel-plugin-svgr-fill-replace'],
      ],
    },
  },
}
````

