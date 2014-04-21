function load_javascript(src) {
  var scriptElem = document.createElement('script');
    scriptElem.src = src;
    scriptElem.type = 'text/javascript'
    scriptElem.async = true;
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

function addOnLoad(fun) {
    if (window.addEventListener) { // W3C standard
        window.addEventListener('load', fun, false);
    } else if (window.attachEvent) { // IE
        window.attachEvent('onload', fun);
    }
}

// menu modification code
var url = window.location.href;
var excludeSubstrings = [
  'http://www.pythonblogs.',
  '/admin.php',
  'contact.php'
]
var modifyMenu = true;
for (var i in excludeSubstrings) {
  var substr = excludeSubstrings[i];
  if (url.indexOf(substr) != -1) {
    modifyMenu = false;
  }
}
if (modifyMenu) {
 var menuUl;
 if (document.getElementById('Sections')) {
    menuUl = document.getElementById('Sections').children[0];
 } else if (document.getElementById('ul_links')) {
    menuUl = document.getElementById('ul_links');
 } else if (document.getElementById('topnav')) {
    menuUl = document.getElementById('topnav');
 } else if (document.getElementById('wordpress')) {
    menuUl = document.getElementById('wordpress').getElementsByTagName('ul')[0];
 } else if (document.getElementById('nav')) {
    menuUl = document.getElementById('nav');
 } else if (document.getElementById('menu')) {
    menuUl = document.getElementById('menu');
 }

 /**
  * Adds links on top of menu. 
  * Returns link node.
  */
 function addMenuLink(ulNode, url, text) {
   var liNode = ulNode.children[0].cloneNode(true);
   var aNode = liNode.getElementsByTagName('a')[0];
   aNode.setAttribute('href', url);
   aNode.innerHTML = text;
   ulNode.insertBefore(liNode, ulNode.firstChild);
   return liNode;
 }

 if (menuUl) {
     addMenuLink(menuUl, 'http://www.pythonblogs.com/register.php', 'Start Your Blog');
     addMenuLink(menuUl, 'http://www.pythonblogs.com', 'Top Python Blogs');
     var img = "<img src='/imgs/lg-share-en.gif' width='125' height='16' alt='Bookmark and Share' style='border:0;vertical-align: middle;'/>";
     var socialLi = addMenuLink(menuUl, 'http://www.addthis.com/bookmark.php?v=250&pubid=linkedweb', img);
     var socialA = socialLi.getElementsByTagName('a')[0];
     socialA.setAttribute('class', socialA.getAttribute('class') ? socialA.getAttribute('class') + ' addthis_button' : 'addthis_button');
 }
}

// analytics code
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-404570-7"]);
_gaq.push(["_setDomainName", "pythonblogs.com"]);
_gaq.push(["_trackPageview"]);

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', multilanguagePage: true, gaTrack: true, gaId: 'UA-404570-7'}, 'google_translate_element');
}

var langs = [
  "Python",
  "PHP",
  "Java",
  "HTML",
  "CSS",
  "Javascript",
  "Ruby",
  "CPP",
  "CSharp",
  "Lisp",
  "Perl",
  "Sql",
  "XML"
]

function addOption(name, select) {
  try {
    var option = document.createElement('option');
    option.setAttribute('value', name.toLowerCase());
    option.innerHTML = name;
    select.appendChild(option);
  } catch (e) {
    if (console) {
      console.log(e);
    }
  }
}

function insertCode() {
  var select = document.getElementById('codeSelect'); 
  var value = select.options[select.selectedIndex].value;
  var editor = tinyMCE.getInstanceById('mce_editor_0');
  editor.execCommand('mceInsertContent', false, '[code ' + value + ']<span id="delete_me"></span>[/code]');
  var span = editor.getDoc().getElementById('delete_me');
  editor.selection.selectNode(span);
  editor.selection.collapse(true);
  span.remove();
}

function enhanceTinyMCE() {
  var toolbar = document.getElementById('mce_editor_0_toolbar');
  if (toolbar) {
    var separator = document.createElement('img');
    separator.setAttribute('class', 'mceSeparatorLine');
    separator.setAttribute('width', '2');
    separator.setAttribute('height', '20');
    separator.setAttribute('alt', 'separator');
    separator.setAttribute('src', 'http://www.pythonblogs.local/js/tinymce/themes/advanced/images/separator.gif');
    toolbar.insertBefore(separator, toolbar.firstChild);

    var a = document.createElement('a');
    a.innerHTML = '<img src="/imgs/code.png"/>';
    a.setAttribute('class', 'mceSelectList mceButtonNormal');
    a.setAttribute('href', 'javascript:insertCode();void(0);');
    toolbar.insertBefore(a, toolbar.firstChild);

    var select = document.createElement('select');
    select.setAttribute('class', 'mceSelectList');
    select.setAttribute('id', 'codeSelect');
    for (var i = 0; i < langs.length; i++) {
      addOption(langs[i], select);
    }
    toolbar.insertBefore(select, toolbar.firstChild);
  }
}


addOnLoad(function() {
    enhanceTinyMCE();
    load_javascript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=linkedweb&domready=1');
    load_javascript('http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    (function() {
      var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
      ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
      var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
    })();
});
