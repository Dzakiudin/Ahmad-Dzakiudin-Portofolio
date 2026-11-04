import { useEffect } from 'react';
import { PATH_MILESTONES } from '../data/portfolioData';

export function useScrollAndParallaxEngine() {
  useEffect(() => {
    const mainHeader = document.getElementById('main-header');
    const heroStage = document.getElementById('hero-stage');
    const heroScene = document.getElementById('hero-zoom-scene');
    const heroParallax = document.getElementById('hero-parallax-layer');
    const heroTitle = document.getElementById('hero-title-block');
    const heroBottom = document.getElementById('hero-bottom-pill');
    const whiteFlash = document.getElementById('laptop-white-flash');

    const workDriver = document.getElementById('work-scroll-driver');
    const workTrack = document.getElementById('selected-work-track');
    const workWaveActive = document.getElementById('work-wave-active') as SVGPathElement | null;
    const workWavePlane = document.getElementById('work-wave-plane');

    const pathDriver = document.getElementById('path-scroll-driver');
    const pathStageContainer = document.getElementById('path-stage-container');
    const pathTrack = document.getElementById('path-horizontal-track');
    const pathWaveSvg = document.getElementById('path-wave-svg') as SVGSVGElement | null;
    const pathWaveActive = document.getElementById('path-wave-active') as SVGPathElement | null;
    const pathWavePlane = document.getElementById('path-wave-plane');
    const scrubberNodesWrap = document.getElementById('path-scrubber-nodes');
    const scrubberProgBar = document.getElementById('path-scrubber-progress');

    const contactSection = document.getElementById('contact');

    const workCardEls = Array.from(document.querySelectorAll<HTMLElement>('[data-work-card]'));
    const milestoneCardEls = Array.from(document.querySelectorAll<HTMLElement>('[data-milestone-card]'));
    const watermarkEls = Array.from(document.querySelectorAll<HTMLElement>('[data-watermark-year]'));
    const pathDotEls = PATH_MILESTONES.map((_, i) => document.getElementById(`path-dot-${i}`));
    const pathLblEls = PATH_MILESTONES.map((_, i) => document.getElementById(`path-label-${i}`));

    let workWaveLen = 2000;
    let pathWaveLen = 3600;
    try {
      if (workWaveActive && typeof workWaveActive.getTotalLength === 'function') {
        workWaveLen = workWaveActive.getTotalLength();
      }
      if (pathWaveActive && typeof pathWaveActive.getTotalLength === 'function') {
        pathWaveLen = pathWaveActive.getTotalLength();
      }
    } catch {
      // fallback lengths
    }

    const layout = {
      vh: window.innerHeight,
      heroTop: 0,
      heroScrollable: 1000,
      workTop: 1000,
      workScrollable: 1000,
      workMaxShift: 800,
      pathTop: 2500,
      pathScrollable: 1500,
      pathMaxShift: 1600,
      scrubberMaxW: 260,
      contactTop: 5000,
      isMobile: false,
      timelineCenter: 0,
      cardCenters: [] as number[],
    };

    function measureLayout() {
      const sy = window.scrollY || window.pageYOffset || 0;
      layout.vh = window.innerHeight;
      layout.isMobile = window.innerWidth < 640;
      if (heroStage) {
        const r = heroStage.getBoundingClientRect();
        layout.heroTop = r.top + sy;
        layout.heroScrollable = Math.max(1, heroStage.offsetHeight - layout.vh);
      }
      if (workDriver && workTrack && workTrack.parentElement) {
        const r = workDriver.getBoundingClientRect();
        layout.workTop = r.top + sy;
        layout.workScrollable = Math.max(1, workDriver.offsetHeight - layout.vh);
        layout.workMaxShift = Math.max(
          0,
          workTrack.scrollWidth - workTrack.parentElement.clientWidth + 24
        );
      }
      if (pathDriver && pathTrack) {
        const r = pathDriver.getBoundingClientRect();
        layout.pathTop = r.top + sy;
        layout.pathScrollable = Math.max(1, pathDriver.offsetHeight - layout.vh);

        const stageEl = pathStageContainer || pathTrack.parentElement;
        layout.timelineCenter = (stageEl ? stageEl.offsetWidth : window.innerWidth) / 2;
        const trackLeft = pathTrack.offsetLeft || 0;
        layout.cardCenters = milestoneCardEls.map(
          (card) => trackLeft + card.offsetLeft + card.offsetWidth / 2
        );

        const lastCard = milestoneCardEls[milestoneCardEls.length - 1];
        if (layout.isMobile) {
          const lastCardCenter = layout.cardCenters[layout.cardCenters.length - 1] || 0;
          layout.pathMaxShift = Math.max(0, lastCardCenter - layout.timelineCenter);
          if (pathWaveSvg) {
            pathWaveSvg.style.width = '';
          }
        } else {
          const lastCardRight = lastCard
            ? trackLeft + lastCard.offsetLeft + lastCard.offsetWidth
            : 0;
          const lastCardCenter = lastCard
            ? trackLeft + lastCard.offsetLeft + lastCard.offsetWidth / 2
            : 0;
          const rightPadding = Math.max(48, Math.round(window.innerWidth * 0.09));
          layout.pathMaxShift = Math.max(0, lastCardRight + rightPadding - window.innerWidth);

          if (pathWaveSvg && lastCardCenter > 0) {
            const targetSvgWidth = Math.round(lastCardCenter * (3200 / 3140));
            pathWaveSvg.style.width = `${targetSvgWidth}px`;
          }
        }
      }
      if (scrubberNodesWrap) {
        layout.scrubberMaxW = Math.max(0, scrubberNodesWrap.offsetWidth - 16);
      }
      if (contactSection) {
        const r = contactSection.getBoundingClientRect();
        layout.contactTop = r.top + sy;
      }
    }

    let scrollY = window.scrollY || 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;
    let curHeroP = 0;
    let curWorkP = 0;
    let curPathP = 0;
    let prevWorkP = 0;
    let prevPathP = 0;
    let workVel = 0;
    let pathVel = 0;
    let lastActiveMilestone = -1;
    let lastTime = performance.now();
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let isSnappingContact = false;

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;

      if (!contactSection || isSnappingContact) return;
      const distToContact = layout.contactTop - scrollY;
      if (mainHeader) {
        if (distToContact <= 48 && distToContact >= -layout.vh * 0.2) {
          mainHeader.classList.add('header-fullscreen-mode');
        } else {
          mainHeader.classList.remove('header-fullscreen-mode');
        }
      }
      if (snapTimer) clearTimeout(snapTimer);
      if (distToContact > 4 && distToContact < layout.vh * 0.25) {
        snapTimer = setTimeout(() => {
          const curDist = layout.contactTop - (window.scrollY || 0);
          if (curDist > 4 && curDist < layout.vh * 0.25) {
            isSnappingContact = true;
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
              isSnappingContact = false;
            }, 700);
          }
        }, 140);
      }
    };

    function positionPlaneOnPath(
      pathEl: SVGPathElement | null,
      planeEl: HTMLElement | SVGElement | null,
      totalLen: number,
      progress: number
    ) {
      if (!pathEl || !planeEl || typeof pathEl.getPointAtLength !== 'function') return;
      try {
        const clamped = Math.max(0, Math.min(1, progress));
        const dist = clamped * totalLen;
        const pt = pathEl.getPointAtLength(dist);
        const nextPt = pathEl.getPointAtLength(Math.min(totalLen, dist + 10));
        const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
        planeEl.setAttribute(
          'transform',
          `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
        );
      } catch {
        // Ignore SVG path error if hidden
      }
    }

    function updateScrubberClasses(activeIdx: number) {
      for (let i = 0; i < PATH_MILESTONES.length; i++) {
        const dot = pathDotEls[i];
        const lbl = pathLblEls[i];
        if (!dot || !lbl) continue;
        if (i === activeIdx) {
          dot.className =
            'w-3.5 h-3.5 rounded-full border-2 transition-transform bg-[#1E7E3A] border-[#1E7E3A] scale-125 shadow-sm';
          lbl.className = 'font-mono-code text-[10.5px] sm:text-[0.6875rem] font-bold text-[#122418]';
        } else if (i < activeIdx) {
          dot.className =
            'w-3.5 h-3.5 rounded-full border-2 transition-transform bg-[#1E7E3A]/60 border-[#1E7E3A]';
          lbl.className = 'font-mono-code text-[10.5px] sm:text-[0.6875rem] font-medium text-[#324B3A]';
        } else {
          dot.className =
            'w-3.5 h-3.5 rounded-full border-2 transition-transform bg-white border-emerald-800/30';
          lbl.className = 'font-mono-code text-[10.5px] sm:text-[0.6875rem] text-[#5C7864]';
        }
      }
    }

    function tick(now: number) {
      const dt = Math.min(0.05, Math.max(0.004, (now - lastTime) * 0.001));
      lastTime = now;
      const t = now * 0.001;

      const smoothMouse = 1 - Math.exp(-7.5 * dt);
      const smoothScroll = 1 - Math.exp(-10.5 * dt);

      curMouseX += (targetMouseX - curMouseX) * smoothMouse;
      curMouseY += (targetMouseY - curMouseY) * smoothMouse;

      // 1. Hero Scroll-Into-Laptop Zoom + Mouse Parallax
      const rawHeroP = Math.max(
        0,
        Math.min(1, (scrollY - layout.heroTop) / layout.heroScrollable)
      );
      if (
        scrollY <= layout.heroTop + layout.heroScrollable + layout.vh &&
        heroScene &&
        heroParallax &&
        heroTitle &&
        heroBottom &&
        whiteFlash
      ) {
        curHeroP += (rawHeroP - curHeroP) * smoothScroll;
        const scale = 1 + Math.pow(curHeroP, 1.72) * 3.45;
        heroScene.style.transform = `translate3d(0, 0, 0) scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;

        const parallaxStrength = Math.max(0, 1 - curHeroP * 2.4);
        const px = curMouseX * -18 * parallaxStrength;
        const py = curMouseY * -12 * parallaxStrength;
        heroParallax.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) scale3d(1.05, 1.05, 1)`;

        const textOp = Math.max(0, 1 - curHeroP * 2.65);
        heroTitle.style.opacity = String(textOp.toFixed(3));
        heroTitle.style.transform = `translate3d(${(curMouseX * 8 * parallaxStrength).toFixed(2)}px, ${(-curHeroP * 60).toFixed(2)}px, 0)`;
        heroBottom.style.opacity = String(textOp.toFixed(3));

        const flashOp = curHeroP > 0.66 ? Math.min(1, (curHeroP - 0.66) / 0.28) : 0;
        whiteFlash.style.opacity = String(flashOp.toFixed(3));
      }

      // 2. Selected Work Horizontal Glide + Per-Card Wave Bobbing & Velocity Tilt
      const rawWorkP = Math.max(
        0,
        Math.min(1, (scrollY - layout.workTop) / layout.workScrollable)
      );
      if (
        scrollY + layout.vh >= layout.workTop - 200 &&
        scrollY <= layout.workTop + layout.workScrollable + layout.vh &&
        workTrack
      ) {
        prevWorkP = curWorkP;
        curWorkP += (rawWorkP - curWorkP) * smoothScroll;
        const rawWorkDelta = (curWorkP - prevWorkP) / dt;
        workVel += (rawWorkDelta - workVel) * 0.18;

        const shiftX = -curWorkP * layout.workMaxShift;
        workTrack.style.transform = `translate3d(${shiftX.toFixed(2)}px, 0, 0)`;

        const velTilt = Math.max(-2.6, Math.min(2.6, -workVel * 1.55));
        for (let i = 0; i < workCardEls.length; i++) {
          const waveY = Math.sin(curWorkP * Math.PI * 2.4 + i * 1.15 + t * 1.25) * 5.5;
          workCardEls[i].style.transform = `translate3d(0, ${waveY.toFixed(2)}px, 0) rotateZ(${velTilt.toFixed(2)}deg)`;
        }

        positionPlaneOnPath(
          workWaveActive,
          workWavePlane,
          workWaveLen,
          0.05 + curWorkP * 0.9
        );
      }

      // 3. The Path So Far Horizontal Glide + Per-Milestone Wave Bobbing & Watermark Parallax
      const rawPathP = Math.max(
        0,
        Math.min(1, (scrollY - layout.pathTop) / layout.pathScrollable)
      );
      if (
        scrollY + layout.vh >= layout.pathTop - 200 &&
        scrollY <= layout.pathTop + layout.pathScrollable + layout.vh &&
        pathTrack
      ) {
        prevPathP = curPathP;
        curPathP += (rawPathP - curPathP) * smoothScroll;
        const rawPathDelta = (curPathP - prevPathP) / dt;
        pathVel += (rawPathDelta - pathVel) * 0.18;

        const pathShiftX = -curPathP * layout.pathMaxShift;
        pathTrack.style.transform = `translate3d(${pathShiftX.toFixed(2)}px, 0, 0)`;

        const velTilt = Math.max(-2.2, Math.min(2.2, -pathVel * 1.3));
        for (let i = 0; i < milestoneCardEls.length; i++) {
          const waveY = Math.cos(curPathP * Math.PI * 2.6 + i * 1.2 + t * 1.15) * 6.0;
          milestoneCardEls[i].style.transform = `translate3d(0, ${waveY.toFixed(2)}px, 0) rotateZ(${velTilt.toFixed(2)}deg)`;
        }

        for (let i = 0; i < watermarkEls.length; i++) {
          const offset = (curPathP * 4 - i) * 42;
          watermarkEls[i].style.transform = `translate3d(${offset.toFixed(1)}px, 0, 0)`;
        }

        positionPlaneOnPath(
          pathWaveActive,
          pathWavePlane,
          pathWaveLen,
          0.04 + curPathP * 0.92
        );

        let activeIdx: number;
        if (layout.isMobile && layout.cardCenters && layout.cardCenters.length > 0) {
          let closestDist = Infinity;
          let closestIdx = 0;
          for (let i = 0; i < layout.cardCenters.length; i++) {
            const cardCenter = layout.cardCenters[i] + pathShiftX;
            const dist = Math.abs(cardCenter - layout.timelineCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closestIdx = i;
            }
          }
          activeIdx = closestIdx;
        } else {
          activeIdx = Math.min(
            PATH_MILESTONES.length - 1,
            Math.max(0, Math.round(curPathP * (PATH_MILESTONES.length - 1)))
          );
        }

        if (scrubberProgBar) {
          if (layout.isMobile) {
            const mobileProg = activeIdx / (PATH_MILESTONES.length - 1);
            scrubberProgBar.style.width = `${(mobileProg * layout.scrubberMaxW).toFixed(1)}px`;
          } else {
            scrubberProgBar.style.width = `${(curPathP * layout.scrubberMaxW).toFixed(1)}px`;
          }
        }
        if (activeIdx !== lastActiveMilestone) {
          lastActiveMilestone = activeIdx;
          updateScrubberClasses(activeIdx);
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    measureLayout();

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => measureLayout());
      if (workTrack) ro.observe(workTrack);
      if (pathTrack) ro.observe(pathTrack);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureLayout, { passive: true });
    window.addEventListener('load', measureLayout, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      if (snapTimer) clearTimeout(snapTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureLayout);
      window.removeEventListener('load', measureLayout);
    };
  }, []);
}
