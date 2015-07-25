# jQuery Tracked Opacity plugin
> Fade an element as you scroll down a page

## Getting started
### NPM
Install package with NPM and add it to your dependencies:
`npm install @mogusbi/jquery.trackedopacity --save`

## Introducing it to your page
Include jQuery and the plugin to your page. Select the element you wish to apply the fade and call the `trackedOpacity` method.

```html
<!doctype html>
<html>
  <head>
    ...
  </head>
  <body>
    <div class="opacity"></div>

    <script src="jquery.js"></script>
    <script src="jquery.trackedopacity.js"></script>
    <script>
      $('.opacity').trackedOpacity();
    </script>
  </body>
</html>
```

## License
Copyright &copy; Mo Gusbi.
Licensed under the MIT license.