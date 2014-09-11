FBplus.badge
======

Modified facebook badge

## Using
Insert before the closing tag *head*:
```
<!-- Load FBplus.badge css -->
<link rel="stylesheet" href="css/fbplus.badge.css">
```
before the closing tag *body*
```
<!-- Place this tag where you want the widget to render -->
<div id="FBplusBadge" data-width="240" data-href="https://facebook.com/youtube" data-rel="page" data-theme="light" data-lang="en"></div>

<!-- Place this tag after the last widget tag -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'js/fbplus.badge.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
```

## Options
Options can be passed as a data attributes.


| Name | Type |	Default |	Description |
| ---- |:----:|:-------:|:----------- |
| data-width | string | 240px | value in the range of 160 - 420 pixels |
| data-href | string | - | you can use full link on page or only name |
| data-rel | string | page | currently widget is relevant only for pages |
| data-theme | string | light | accepts: 'light' or 'dark' |
| data-lang | string | en |  list of all available values: 'de', 'fr', 'it', 'es', 'pt', 'ru', 'ua' |

## Languages
__NOTE:__ this list related to data attribute 'data-lang'.

| Abbr | Language |
| ---- |:----------- |
| en | English |
| de | German |
| fr | French |
| it | Italian |
| es | Spanish |
| pt | Portuguese |
| ru | Russian |
| ua | Ukrainian |

## Browser compability

## Demo
[shtange.github.io/fbplus](http://shtange.github.io/fbplus/)

## License
Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
