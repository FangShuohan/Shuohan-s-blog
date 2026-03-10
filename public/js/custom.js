document.addEventListener("DOMContentLoaded", function() {
  const layer = document.getElementById('startup-layer');
  const video = document.getElementById('startup-video');
  
  // 逻辑判断：是否是首页 且 本次会话(Session)中还没播放过
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  const hasPlayed = sessionStorage.getItem('startupPlayed');

  if (isHomePage && !hasPlayed && layer && video) {
    // 正常播放流程
    video.play().catch(() => {
      // 如果被浏览器拦截（比如未静音），则直接隐藏
      layer.style.display = 'none';
    });

    video.onended = function() {
      layer.style.opacity = '0';
      setTimeout(() => {
        layer.style.display = 'none';
        // 播放完后存入标记，本次会话不再播放
        sessionStorage.setItem('startupPlayed', 'true');
      }, 800);
    };
  } else {
    // 如果不是首页，或者已经播放过，直接移除遮罩层，不浪费加载时间
    if (layer) {
      layer.style.display = 'none';
    }
  }
});