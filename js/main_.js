import arrNewsList from './news.con.js';

const box = document.querySelector('.logos-width');
const banner = document.querySelector('.logos-width .logo');
const bannerUl = document.querySelector('.logos-width .logo ul');
let clone = banner.cloneNode(true);

box.appendChild(clone);

banner.style.left = '0px';
clone.style.left = bannerUl;
banner.classList.add('original');
clone.classList.add('clone');

const stickyHeader = () => {
    const $header = get('#header');
    const $headerType = get('#header .type');
    const $visual = get('#visual');
    let topY = 0,
        visH = 0;
    window.addEventListener('scroll', (e) => {
        topY = window.scrollY;
        visH = $visual.getBoundingClientRect().height;
        if (topY > visH) {
            $header.style.position = 'fixed';
            $header.style.top = '0';
        } else if (topY < visH) {
            $header.style.display = `none`;
            $header.style.display = `block`;
            $header.style.position = `absolute`;
        }
    });
};
stickyHeader();

// area5 between 6 banner link
const btnGoCustom = document.querySelector('.main .band-banner');
btnGoCustom.addEventListener('click', (e) => {
    location.href = 'news.html';
});
const objDefaultAni = [{ opacity: [0, 1] }, { duration: 300, fill: 'forwards' }];

// for RollBanner class
class CMakeRollBanner {
    prntNode = null;
    chldNode = null;
    interval = 3000;
    nRollTime = 0.4;
    static pagingEle;
    timer = null;
    nPrntWidth = 0;
    nCurNode = 0;
    nLastNode = 0;
    paingClsName = 'on';
    bAutoRoll = true;
    nTotalCnt = 0;
    constructor(ele) {
        this.prntNode = ele;
        this.nPrntWidth = parseInt(getComputedStyle(ele).width);
        this.chldNode = [...ele.children];
        this.nTotalCnt = this.chldNode.length;
    }
    init() {
        this.pagingEle !== undefined ? this.pagingInit() : null;
        this.run(this.nCurNode);
        this.bAutoRoll ? this.startRoll() : null;
    }
    run(num = 0) {
        num = (num < 0 ? this.nTotalCnt - 1 : num) % this.nTotalCnt;
        this.nCurNode = num;
        this.chldNode[this.nLastNode].style.zIndex = 0;
        this.chldNode[num].style.transition = `left ${this.nRollTime}s`;
        this.chldNode[num].style.left = `0px`;
        this.chldNode[num].style.opacity = 1;
        this.chldNode[num].style.zIndex = 1;
        this.bAutoRoll && this.pagingEle !== undefined ? this.paging(num) : null;
        this.nCurNode !== this.nLastNode ? this.timeout(this.nLastNode) : null;
        this.nLastNode = this.nCurNode;
    }
    stopRoll() {
        clearInterval(this.timer);
        this.timer = null;
    }
    startRoll() {
        this.timer = setInterval(() => {
            this.run(this.nCurNode + 1);
        }, this.interval);
    }
    setRoll(num = 0) {
        this.run(num);
        this.stopRoll();
        this.startRoll();
    }
    timeout(num = 0) {
        setTimeout(() => {
            this.chldNode[num].style.transition = 'none';
            this.chldNode[num].style.left = `${this.nPrntWidth}px`;
            this.chldNode[num].style.opacity = 0;
        }, this.nRollTime * 1000);
    }
    pagingInit() {
        this.pagingEle.forEach((item, idx) => {
            item.addEventListener('click', (e) => {
                this.paging(idx);
                this.setRoll(idx);
            });
        });
    }
    paging(num = 0) {
        this.pagingEle.forEach((item) => item.classList.remove(this.paingClsName));
        this.pagingEle[num].classList.add(this.paingClsName);
    }
}
class CRollForA4 extends CMakeRollBanner {
    static objAni;
    constructor(ele) {
        super(ele);
    }
    run(num = 0) {
        super.run(num);
        this.ani();
    }
    ani() {
        if (this.objAni === undefined) return;
        const time = this.nRollTime * 1000;
        const num = this.nCurNode;
        this.objAni[num].style.transform = 'translateX(-100%)';
        this.objAni[num].style.opacity = 0;
        this.objAni[num].animate({ ...objDefaultAni[0], transform: ['translateX(-100%)', 'translateX(0%)'] }, { ...objDefaultAni[1], duration: time, delay: time / 2 });
    }
}

// main visual rolling
const ulMainVisu = document.querySelector('#visual .main-vis-banner');
const liPagingVisu = document.querySelectorAll('#visual .main-vis-paging ul li');
const btnPrevVisu = document.querySelector('#visual .main-vis-paging .prev');
const btnNextVisu = document.querySelector('#visual .main-vis-paging .next');
const btnsVisuGo = document.querySelectorAll('#visual .main-vis-banner li .title p a');
const cRollVisu = new CMakeRollBanner(ulMainVisu);
cRollVisu.pagingEle = liPagingVisu;
cRollVisu.init();
btnPrevVisu.addEventListener('click', (e) => cRollVisu.setRoll(cRollVisu.nCurNode - 1));
btnNextVisu.addEventListener('click', (e) => cRollVisu.setRoll(cRollVisu.nCurNode + 1));
btnsVisuGo.forEach((item, idx) => {
    item.addEventListener('mouseenter', (e) => cRollVisu.stopRoll());
    item.addEventListener('mouseleave', (e) => cRollVisu.startRoll());
});

// area1 hover event
const ulArea1 = document.querySelector('.main .main-area1 .sol-listing');
const imgArea1 = document.querySelector('.main .main-area1 .sol-bn img');
const divArea1 = [...document.querySelectorAll('.main .main-area1 .sec-title')];
const liArea1 = [...ulArea1.children];
liArea1.forEach((item, idx) => {
    item.addEventListener('mouseenter', (e) => {
        fSetArea1Hover(idx + 1);
    });
});
ulArea1.addEventListener('mouseleave', (e) => {
    fSetArea1Hover(0);
});
function fSetArea1Hover(num = 0) {
    divArea1.forEach((item) => item.classList.remove('on'));
    divArea1[num].classList.add('on');
    divArea1[num].animate(...objDefaultAni);
    imgArea1.animate(...objDefaultAni);
    imgArea1.setAttribute('src', `images/main/main-area1-img${num}.jpg`);
    imgArea1.setAttribute('alt', document.querySelectorAll('.main .main-area1 .sec-title .title')[num].textContent);
}

// area3 count
const ulCountNum = document.querySelector('.main .main-area3 figure .count-container');
const arrCountNum = document.querySelectorAll('[data-count]');
const emCountNum = document.querySelectorAll('.main .main-area3 figure .count-container li .counting');
function fObserverInitA3() {
    // const opt = null;
    const opt = { root: null, rooMargin: '50px 0px 50px 0px', threshold: 0, delay: 1000 };
    const obser = new IntersectionObserver((entries, observer) => {
        if (entries[0].intersectionRatio <= 0) return;
        if (entries[0].isIntersecting) {
            const interval = 1000;
            emCountNum.forEach((item, idx) => {
                const num = Number(arrCountNum[idx].dataset.count),
                    speed = 250;
                const unit = arrCountNum[idx].textContent.charAt(arrCountNum[idx].textContent.length - 1);
                let currnt = 0,
                    step = 0;
                const fCountUp = () => {
                    step = Math.floor(num / speed);
                    step = step === 0 ? speed / 700 : step;
                    if (currnt <= num) {
                        currnt += step;
                        item.textContent = new Intl.NumberFormat().format(currnt.toFixed(0)) + unit;
                        setTimeout(fCountUp, 10);
                    } else item.textContent = new Intl.NumberFormat().format(num) + unit;
                };
                fCountUp();
            });
            observer.unobserve(ulCountNum);
        }
    }, opt);
    return obser;
}
fObserverInitA3().observe(ulCountNum);

// area3 rolling
const btnPrevArea3 = document.querySelector('.main .main-area3 figure .move-btn .prev');
const btnNextArea3 = document.querySelector('.main .main-area3 figure .move-btn .next');
const arrImgArea3 = document.querySelectorAll('.main .main-area3 figure .roll .rolling-container > img');
const emTextArea3 = document.querySelector('.main .main-area3 figure .roll .img-txt-more em');
const ancTextArea3 = document.querySelector('.main .main-area3 figure .roll .img-txt-more a.more');
const divTextArea3 = document.querySelector('.main .main-area3 figure .roll .rolling-container .img-txt-more');
const arrMoreURLA3 = ['news.html', 'recruit.html', 'index.html'];
let nCurA3 = 0;
const fRollArea3Bann = (num = 0) => {
    const cnt = arrImgArea3.length;
    const arrCls = ['before', 'on', 'after'];
    let ani = [{ transform: ['scale(1)', 'scale(1.2)'] }, { duration: 400, fill: 'forward' }];
    const center = 1;
    num = (num < 0 ? cnt - 1 : num) % cnt;
    nCurA3 = num;
    emTextArea3.textContent = arrImgArea3[nCurA3].getAttribute('alt');
    ancTextArea3.setAttribute('href', arrMoreURLA3[nCurA3]);
    for (let i = 0; i < cnt; i++) {
        let tmp = i - center + nCurA3;
        tmp = (tmp < 0 ? cnt + tmp : tmp) % cnt;
        if (i === center) {
            // arrImgArea3[tmp].style.transition = 'none';
            // arrImgArea3[tmp].animate(...ani);
        } //else arrImgArea3[tmp].style.transition = 'all 0.4s';
        arrImgArea3[tmp].classList.remove(arrImgArea3[tmp].className);
        arrImgArea3[tmp].classList.add(arrCls[i]);
    }
    divTextArea3.animate({ ...objDefaultAni[0], transform: ['translateY(50px)', 'translateY(0)'] }, { duration: 1000 });
};
btnNextArea3.addEventListener('click', (e) => {
    fRollArea3Bann(nCurA3 + 1);
});
btnPrevArea3.addEventListener('click', (e) => {
    fRollArea3Bann(nCurA3 - 1);
});

// area4 roll
const ulRollArea4 = document.querySelector('.main .main-area4 .suit-banner');
const ancRollArea4 = document.querySelectorAll('.main .main-area4 .menu-paing a');
const cRollArea4 = new CRollForA4(ulRollArea4);
cRollArea4.pagingEle = ancRollArea4;
cRollArea4.objAni = document.querySelectorAll('.main .main-area4 .suit-banner li .bg-trans');
cRollArea4.init();

// area6 scroll
const btnContentCard = document.querySelectorAll('.main .main-area6 article .tab a');
const newslist = document.querySelector('.news-list');
const bloglist = document.querySelector('.blog-list');
const ulCardList = document.querySelectorAll('.main .main-area6 article .rolling .thums');
const divScrollNavi = document.querySelector('.main .main-area6 .rolling-bar span.on');
const arrBlogList = [...arrNewsList].sort((a, b) => (a.index > b.index ? -1 : 0));
const nDefaultGage = parseInt(getComputedStyle(divScrollNavi).width);
const nMaxGage = Number(getComputedStyle(divScrollNavi).getPropertyValue('--maxGage')) - nDefaultGage;
const contains = document.querySelector('.main .sct1');
// contains.style.setProperty('--moveHeigh', '670px');
// contains.style.setProperty('--moveWidth', '-1850px');
console.log(getComputedStyle(contains).getPropertyValue('--moveWidth'), getComputedStyle(contains).getPropertyValue('--moveHeigh'), 1);
let nCaptureY = 0,
    bCaptureY = false,
    bScrollEnd = false,
    bViewNews = true,
    liCardList = [[], []],
    nMoveWdth = [];
function fContListInit(list, arr) {
    const ul = list.querySelector('ul');
    const cate = list.className.indexOf('news');
    ul.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const pic = document.createElement('img');
        pic.setAttribute('alt', arr[i].title);
        pic.setAttribute('src', arr[i].thumb);
        p.append(pic);
        const span = document.createElement('span');
        span.setAttribute('class', 'title');
        span.textContent = arr[i].title;
        li.addEventListener('click', (e) => {
            if (cate >= 0) location.href = 'news.html';
            else {
                localStorage.setItem('num', i + 1);
                location.href = 'blog.html';
            }
        });
        li.append(p, span);
        ul.append(li);
    }
}
function fGageReset(flag) {
    bScrollEnd = false;
    divScrollNavi.style.width = `${nDefaultGage}px`;
    liCardList.forEach((list) => list.forEach((item) => (item.style.transform = `translateX(0px)`)));
    if (flag === true) {
        newslist.classList.add('on');
        bloglist.classList.remove('on');
    } else {
        newslist.classList.remove('on');
        bloglist.classList.add('on');
    }
}
function fSetGageBar(e) {
    const idx = bViewNews ? 0 : 1;
    const nListTop = Math.round(ulCardList[idx].getBoundingClientRect().y);
    const nListHgt = Math.round(ulCardList[idx].getBoundingClientRect().height);
    const bCenterEle = Math.round(window.innerHeight / 1.1) > Math.round(nListTop + nListHgt / 1.1);
    if (bCenterEle && !bCaptureY) [nCaptureY, bCaptureY] = [window.scrollY, true];
    if (bCenterEle && window.scrollY - nCaptureY <= nListHgt && !bScrollEnd) {
        // window.scrollTo(0, 6800);
        let [x1, x2] = [(Math.floor(window.scrollY - nCaptureY) * nMaxGage) / nListHgt, (Math.floor(window.scrollY - nCaptureY) * nMoveWdth[idx]) / nListHgt];
        if (x1 < 0 || x2 < 0) return;
        divScrollNavi.style.width = `${nDefaultGage + x1}px`;
        liCardList[idx].forEach((item) => (item.style.transform = `translateX(${-x2}px)`));
    } else if (bCenterEle && window.scrollY - nCaptureY > nListHgt && !bScrollEnd) {
        bScrollEnd = true;
        divScrollNavi.style.width = `${nDefaultGage + nMaxGage}px`;
        liCardList[idx].forEach((item) => (item.style.transform = `translateX(${-(nMoveWdth[idx] + 120)}px)`));
    }
    // console.log(window.scrollY);
}
fContListInit(newslist, arrNewsList);
fContListInit(bloglist, arrBlogList);
ulCardList.forEach((item, idx) => liCardList[idx].push(...item.children));
liCardList.forEach((item, idx) => {
    nMoveWdth[idx] =
        item.reduce((acc, crr) => {
            return acc + parseInt(getComputedStyle(crr).marginLeft) + parseInt(getComputedStyle(crr).marginRight) + parseInt(getComputedStyle(crr).width);
        }, 0) - parseInt(getComputedStyle(ulCardList[idx]).width);
});
// window.addEventListener('scroll', fSetGageBar);
btnContentCard.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        const list = document.querySelectorAll('.main .main-area6 article .rolling');
        list.forEach(($item) => {
            $item.classList.remove('on');
            $item.style.opacity = 0;
        });
        btnContentCard.forEach(($item) => $item.classList.remove('on'));
        item.classList.add('on');
        bViewNews = idx === 0 ? true : false;
        fGageReset(bViewNews);
        list[idx].animate({ ...objDefaultAni[0] }, { ...objDefaultAni[1], delay: 100 });
        list[idx].classList.add('on');
    });
});
const divL = document.querySelector('.main .sct1 .contain .large');
const ul1 = document.querySelector('.main .sct1 .contain .large ul');
function ulFixedPosition(e) {
    let ty = ul1.getBoundingClientRect().top;
    // ul1.style.transform = `translateY(${ty}px)`;
    // console.log(ul1.getBoundingClientRect().top, e.pageY, e.deltaY, e.clientY);
}
divL.addEventListener('wheel', ulFixedPosition);
const ty = window.addEventListener('scroll', () => {});
