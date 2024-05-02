'use strict';
import CBannerRoll from './index.cls.js';
const ulToolTop = document.querySelector('.sec1 ul');
const divCountBox = document.querySelector('.sec1 .inner > div');
const spanContTxt = document.querySelector('.sec1 .inner > div span');
const interval = 1000,
    nWeelMax = 500;
let bCall = false,
    ulRoll = null,
    curTime,
    nWheelCalc = 0;
let fConInit = null,
    scrollPositionObs = 0;
(fConInit = () => {
    spanContTxt.textContent = 0;
    fObserverInit(divCountBox);
    ulRoll = new CBannerRoll(ulToolTop);
    ulRoll.initCNode(3, 1);
    ulToolTop.addEventListener('wheel', (e) => fToolTipScrollInit(e), { passive: false, capture: true });
    ulToolTop.addEventListener('scrollend', (e) => {
        ulToolTop.removeEventListener('wheel', (v) => fToolTipScrollInit(v), { passive: false, capture: true });
    });
})();
const fObserCallbck = (entries, observer) => {
    if (entries[0].intersectionRatio <= 0) return;
    if (bCall) return;
    // console.clear();
    // console.log(entries,observer);
    const maxCnt = 40000;
    const ani = { opacity: [0, 1], transform: ['translateY(+100px)', 'translateY(0px)'] };
    const aniOpt = { duration: interval, iterations: 1, fill: 'forwards' };
    divCountBox.style.visibility = 'visible';
    divCountBox.animate(ani, aniOpt);
    for (let i = 0; i <= maxCnt; i++) {
        setTimeout(() => {
            spanContTxt.textContent = new Intl.NumberFormat().format(i);
        }, 0.03 * i);
    }
    bCall = true;
};
function fObserverInit(ele) {
    const opt = { root: null, rooMargin: '50px', threshold: 0.5, delay: 0 };
    const obser = new IntersectionObserver((entries, observer) => fObserCallbck(entries, observer), opt);
    obser.observe(ele);
}
const fTooltipScroll = (scY, e, timestamp) => {
    ulRoll.onScrollStart = scY;
    ulRoll.run(e);
    // console.log(timestamp,curTime);
};
function fToolTipScrollInit(e) {
    e.preventDefault();
    curTime = performance.now();
    scrollPositionObs = window.scrollY;
    // ulToolTop.scrollTop = 0;
    nWheelCalc += e.deltaY;
    if (Math.abs(nWheelCalc) > nWeelMax) {
        window.requestAnimationFrame((timeStamp) => {
            fTooltipScroll(scrollPositionObs, e, timeStamp);
        });
        nWheelCalc = 0;
    }
}
//https://www.figma.com/proto/CmhaJahjeRTfMCbbvQs8z0/%EC%9B%B9%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-1%EC%B0%A8?type=design&node-id=336-149&t=pbxMYE0XxqDRPRRC-0&scaling=min-zoom&page-id=200%3A102&starting-point-node-id=325%3A219&show-proto-sidebar=1
/*
옵저버 사용법
const $priceLis = getAll('.price .pay-list ul li');
    let observer = new IntersectionObserver((e) => {
        e.forEach((lis) => {
            if (lis.isIntersecting) { -> 첨에 화면에 보여졌을 때
                setTimeout(() => {
                    lis.target.style.opacity = 1;
                    lis.target.style.transform = `translateY(0px)`;
                }, 300);
            } else {
                // 화면에서 없어지면 투명도 0
                setTimeout(() => {
                    lis.target.style.opacity = 0;
                    lis.target.style.transform = `translateY(50px)`;
                }, 300);
            }
        });
    });
    // observe()컨텐츠가 뷰포트에 나타나는지 확인해줌
    observer.observe($priceLis[0]);
    observer.observe($priceLis[1]);
    observer.observe($priceLis[2]);
}
*/
