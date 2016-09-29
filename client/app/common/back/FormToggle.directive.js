
export default function () {
  return function (scope, el, attrs) {
    alert('works');
    el.bind('click', function (event) {

    });

    scope.$on('$destroy', function () {
      el.unbind('click');
    });
  }
}
