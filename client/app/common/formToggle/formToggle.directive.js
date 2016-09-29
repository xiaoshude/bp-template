export default function () {
  return function (scope, el, attrs) {
    var $a=$('<a href="javascript:;" class="formToggle formExpand"></a>').appendTo($(el).find('.row'));
    $a.bind('click', function (event) {
      alert(1);
    });

    scope.$on('$destroy', function () {
      el.unbind('click');
    });
  }
}
