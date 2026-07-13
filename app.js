/* 공유 셸(사이드바) 주입 + 다이얼로그/토스트 유틸 — 목업용
   사이드바 스타일: ck-adm.muhayu.com 실측 반영 (섹션 라벨 + 항목, 하단 사용자/로그아웃) */
(function () {
  const icon = {
    policy: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    dot:    '<svg class="i dot" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/></svg>',
    user:   '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    logout: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
    panel:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>',
  };

  function svcGroup(prefix, label, disabled) {
    const active = document.body.getAttribute('data-active') || '';
    const hrefDef = disabled ? '#' : prefix + '-features.html';
    const hrefDom = disabled ? '#' : prefix + '-domains.html';
    return `
      <div class="nav-group-label">${label}</div>
      <div class="nav-parent">${icon.policy}<span>기능별 이용 제한 정책 관리</span></div>
      <div class="nav-children">
        <a class="nav-item child ${active === prefix + '-default' ? 'active' : ''}" href="${hrefDef}">${icon.dot}<span>기본 적용 정책 설정</span></a>
        <a class="nav-item child ${active === prefix + '-domain' ? 'active' : ''}" href="${hrefDom}">${icon.dot}<span>도메인별 정책 설정</span></a>
      </div>`;
  }

  function renderSidebar() {
    const host = document.getElementById('sidebar');
    if (!host) return;
    host.innerHTML =
      `<div class="brand"><span class="logo">CK</span><span>Copykiller 관리기</span></div>` +
      `<div class="nav-scroll">` +
        svcGroup('ck', 'CK 관리기 · 한국', false) +
        `<div class="nav-sep"></div>` +
        svcGroup('cm', 'CM 관리기 · 일본', true) +
      `</div>` +
      `<div class="sidebar-foot"><div class="user-row">${icon.user}<span class="email">iwang@muhayu.com</span>` +
        `<button class="logout-icon" title="로그아웃" onclick="toast('로그아웃 (목업)')">${icon.logout}</button></div></div>`;
  }

  // 헤더 패널 토글(사이드바 접기)
  window.toggleSidebar = function () { document.body.classList.toggle('sidebar-collapsed'); };

  // 다이얼로그
  window.openDialog = function (id) { const el = document.getElementById(id); if (el) el.classList.add('open'); };
  window.closeDialog = function (id) { const el = document.getElementById(id); if (el) el.classList.remove('open'); };

  // 토스트
  window.toast = function (msg) {
    let t = document.getElementById('__toast');
    if (!t) { t = document.createElement('div'); t.id = '__toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2000);
  };

  window.__panelIcon = icon.panel;

  document.addEventListener('DOMContentLoaded', function () {
    renderSidebar();
    // 헤더 토글 아이콘 주입
    document.querySelectorAll('[data-panel-toggle]').forEach(el => {
      el.innerHTML = icon.panel; el.addEventListener('click', window.toggleSidebar);
    });
    document.querySelectorAll('.overlay').forEach(ov => {
      ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
    });
  });
})();
