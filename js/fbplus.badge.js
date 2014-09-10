/*
 *  JavaScript FBplus Badge 
 *  https://github.com/shtange/FBplus
 *
 *  Copyright 2014, Yurii Shtanhei
 *  site: http://shtange.com/FBplus/
 *  google+: https://plus.google.com/+YuriiShtanhei
 *  habr: http://habrahabr.ru/users/shtange/
 *  email: y.shtanhei@gmail.com
 *
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/MIT
 */

(function() {
var FBplus = function() {
  this.badge = document.getElementById("FBplusBadge");
  this.bdata = {'minwidth': 160, 'maxwidth': 420, 'deflang': 'en', 'descrlen': 240};
  this.udata = {'width': 240, 'href': '', 'theme': 'light', 'lang': 'en_EN', 'font': 'Tahoma'};
  this.fblang = {'en': 'en_US', 'de': 'de_DE', 'fr': 'fr_FR', 'it': 'it_IT', 'es': 'es_ES', 'pt': 'pt_PT', 'ru': 'ru_RU', 'ua': 'uk_UA'}
  this.fbdata = []; // "id", "link", "cover", "picture", "name", "about", "mission", "likes"
  this.tmpl = {};
}
FBplus.prototype = {
  load: function() {
    this.getUserSettings();
    this.getFacebookData();
    this.setBadgeTheme();
  },
  getUserSettings: function() {
    var b = this.badge,
        udb = this.udata;
    for (var i in udb) {
      udb[i] = b.getAttribute("data-" + i);
    }

    this.udata = this.validateUserData(b, udb);
  },
  validateUserData: function(b, udb) {
    var width, href, theme, lang, font;

    for (var i in udb) {
      switch (i) {
        case "width":
          width = parseInt(b.getAttribute("data-" + i));
          width = (width && width < this.bdata.minwidth) ? this.bdata.minwidth : width;
          width = (width && width > this.bdata.maxwidth) ? this.bdata.maxwidth : width;
          udb[i] = (width) ? width : this.udata.width;
          break
        case "href":
          href = b.getAttribute("data-" + i);
          udb[i] = (href) ? href.substring(href.lastIndexOf("/")+1) : this.udata.href;
          break
        case "theme":
          theme = b.getAttribute("data-" + i);
          udb[i] = (theme == "light" || theme == "dark") ? theme : this.udata.theme;
          break
        case "lang":
          lang = b.getAttribute("data-" + i);
          lang = (this.fblang[lang] && this.fblang[lang].length > 0) ? lang : this.bdata.deflang;
          udb[i] = this.fblang[lang];
          udb['like'] = lang;
          break
      }
    }

    return udb;
  },
  getFacebookData: function() {
    var d = document,
        s = d.createElement('script'),
        f = ["id", "username", "name", "about", "mission", "cover", "picture", "link", "likes", "checkins", "talking_about_count"];
    s.src = 'https://graph.facebook.com/' + this.udata.href + '?fields=' + f.join(",") + '&callback=FBcallback';
    d.body.appendChild(s);
  },
  setFacebookData: function(json) {
    try {
      this.fbdata = [];
      for (var i in json) {
        this.fbdata[i] = (typeof(json[i]) == 'object') ? (json[i].source || json[i].data.url) : json[i].toString();
      }
    } catch(e) {
      errorHandler(e, "no valid data");
    }
    this.createTemplate();
  },
  setBadgeTheme: function() {
    this.badge.setAttribute("class", this.udata.theme);
  },
  createTemplate: function() {
    var d = document,
        b = this.badge,
        cw = (this.udata.width-2),
        ch = Math.floor(cw/98)*12+Math.floor(cw/100+10)*10,
        udb = this.udata,
        fdb = this.fbdata,
        dscr = (fdb.mission || fdb.about).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, ''),
        div = {},
        tmpl = {
          "cover": {
            "style": "background-image: url(" + (fdb.cover || '') + "); height: " + ch + "px"
          },
          "picture": {
            "a": {
              "href": fdb.link,
              "target": "_blank",
              "img": {
                "width": 80,
                "height": 80,
                "src": "https://graph.facebook.com/" + fdb.username + "/picture?width=80&height=80"
              }
            }
          },
          "name": {
            "a": {
              "href": fdb.link,
              "target": "_blank",
              "html": fdb.name
            }
          },
          "link": {
            "html": "facebook.com/" + fdb.username
          },
          "about": {
            "html": (dscr.length > this.bdata.descrlen) ? dscr.substring(0, this.bdata.descrlen) + "..." : dscr
          },
          "button": {
            "iframe": {
              "class": udb.like,
              "src": "http://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2F" + fdb.username + "&width&layout=button&action=like&show_faces=false&share=false&height=35&locale=" + udb.lang,
              "scrolling": "no",
              "frameborder": "no",
              "allowTransparency": "true"
            }
          },
          "likes": {
            "span": {
              "html": fdb.likes.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
            }
          }
        };

      if (this.browser.isIE() && this.browser.isIE() < 10 && fdb.cover.length > 0) {
        tmpl["cover"] = {
          "img": {
            "style": "width: " + (cw+ch) + "px !important; height: auto !important; margin-left: -" + (ch/2) + "px;",
            "src": fdb.cover
          }
        }
      }

    b.style.width = cw + "px";
    for (var t in tmpl) {
      elem = tmpl[t];
      for (var e in elem) {
        div[t] = d.createElement("div");
        div[t].className = "page-" + t;
        if (typeof(elem[e]) === "object") {
          var item = elem[e];
          div[t][e] = d.createElement(e);
          for (var i in item) {
            if (typeof(item[i]) == "object") {
              addt = item[i];
              div[t][e][i] = d.createElement(i);
              for (var a in addt) {
                div[t][e][i].setAttribute(a, addt[a]);
              }
              div[t][e].appendChild(div[t][e][i]);
            } else {
              if (i == "html") {
                div[t][e].innerHTML = item[i];
              } else {
                div[t][e].setAttribute(i, item[i]);
              }
            }
          }
          div[t].appendChild(div[t][e]);
        } else {
          if (e == "html") {
            div[t].innerHTML = elem[e];
          } else {
            div[t].setAttribute(e, elem[e]);
          }
        }
        b.appendChild(div[t]);
      }
    }
  },
  browser: {
    isIE: function() {
      var nav = navigator.userAgent.toLowerCase();
      return (nav.indexOf('msie') != -1) ? parseInt(nav.split('msie')[1]) : false;
    }
  }
}
FBcallback = function(jsonData) {
  try {
    FBPbadge.setFacebookData(jsonData);
  } catch(e) {
    errorHandler(e, "bad request");
  }
}
errorHandler = function(e, msg) {
  console.error(e, "FBplus Badge: " + msg);
}

var FBPbadge = new FBplus();
FBPbadge.load();

})();
