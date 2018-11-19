## SVGR Fill Replace Babel Plugin
This plugin is to be used as a JSX plugin for [SVGR](https://github.com/smooth-code/svgr).

## Usage
Add the package by adding `"babel-plugin-svgr-fill-replace": "github:Exictos-DCS/babel-plugin-svgr-fill-replace",` to your project dependencies.  

In the *svgr* config file add the following:
````json
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

