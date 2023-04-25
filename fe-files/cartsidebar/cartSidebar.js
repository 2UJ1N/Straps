// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName('link'));
      var head = document.getElementsByTagName('head')[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (
          (elem.href && typeof rel != 'string') ||
          rel.length == 0 ||
          rel.toLowerCase() == 'stylesheet'
        ) {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
          elem.href =
            url +
            (url.indexOf('?') >= 0 ? '&' : '?') +
            '_cacheOverride=' +
            new Date().valueOf();
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address =
      protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == 'reload') window.location.reload();
      else if (msg.data == 'refreshcss') refreshCSS();
    };
    if (
      sessionStorage &&
      !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')
    ) {
      console.log('Live reload enabled.');
      sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
    }
  })();
} else {
  console.error(
    'Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.'
  );
}
// ]]>

// .trash-icon 클래스를 가진 모든 요소를 찾아서 이벤트 리스너를 추가합니다.
const trashIcons = document.querySelectorAll('.trash-icon');
trashIcons.forEach((trashIcon) => {
  trashIcon.addEventListener('click', function () {
    // 클릭된 요소의 부모 li 태그를 찾아서 삭제합니다.
    const li = this.closest('li');
    li.remove();
  });
});
