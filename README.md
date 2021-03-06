# FBplus.badge
Alternative facebook badge for pages.

## Caution!
Do not use the library on a live site. The library does not work properly. It is a consequence of changes in the facebook policy.

## Screenshots
![alt text](https://raw.githubusercontent.com/shtange/fbplus/master/screend.jpg "FBplus.badge screenshots (dark theme)")

## Using
Insert before the closing tag *head*:
```
<!-- Include widget styles -->
<link rel="stylesheet" href="css/fbplus.badge.css">
```
Insert widget code on your page:
```
<!-- Place this tag where you want the widget to render -->
<div id="FBplusBadge" data-width="240" data-href="https://facebook.com/{page name}" data-rel="page" data-theme="light" data-lang="en"></div>

<!-- Place this tag after the last widget tag -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'js/fbplus.badge.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
```
*See [demo](https://github.com/shtange/fbplus/tree/master/demo) as example.*

## Options
Options can be passed as a data attributes.


| Name | Type |	Default |	Description |
| ---- |:----:|:-------:|:----------- |
| data-width | string | 240px | value in the range of 160 - 420 pixels |
| data-href | string | --- | you can use full link on page or only name |
| data-rel | string | page | currently widget is relevant only for facebook pages |
| data-theme | string | light | accepts: 'light' or 'dark' |
| data-lang | string | en | available values: 'en', 'de', 'fr', 'it', 'es', 'pt', 'ru', 'ua' |

#### Languages
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

## Supported browsers
Google Chrome, Firefox, Safari, Opera, Internet Explorer 8+

## Demo
Demo version here [shtange.github.io/fbplus](http://shtange.github.io/fbplus/)

## Publications
Review on [Habrahabr](https://habrahabr.ru/post/249973/) (russian language)

## License
Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
