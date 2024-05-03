import { strNewsDataURL, blogPost } from './data.js';

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

// scroll paging
let arrGetSectionTops = [];
function fGetAreaTops() {
    const nDocuTop = document.documentElement.getBoundingClientRect().top;
    return [...document.querySelectorAll('.main .areas')].map((item) => Math.floor(item.getBoundingClientRect().top - nDocuTop));
}
const fWheelPage = (e) => {
    if (e.deltaY < 0) return;
    const nNowY = Math.floor(window.scrollY) + 100;
    let ty = e.deltaY > 0 ? arrGetSectionTops.find((num) => nNowY < num) : arrGetSectionTops.findLast((num) => nNowY > num);
    ty = ty === undefined && e.deltaY < 0 ? 0 : ty;
    const k = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
    if (ty !== undefined && k !== true) {
        e.preventDefault();
        window.scroll({ top: ty + 5, behavior: 'smooth' });
    }
};
window.addEventListener('resize', (e) => {
    arrGetSectionTops = fGetAreaTops();
});
window.addEventListener('load', (e) => {
    arrGetSectionTops = fGetAreaTops();
});
window.addEventListener('wheel', fWheelPage, { passive: false });

// area5 between 6 banner link
const btnGoCustom = document.querySelector('.main .band-banner');
btnGoCustom.addEventListener('click', (e) => {
    location.href = 'price.html';
});
const objDefaultAnit = [{ opacity: [0, 1] }, { duration: 300, fill: 'forwards' }];

// for RollBanner class
class CMakeRollBanner {
    prntNode = null;
    chldNode = null;
    interval = 4500;
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
    bPagingAni = false;
    spanDot = document.querySelector('.main .main-area4 .menu-paing span');
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
        this.objAni[num].animate({ ...objDefaultAnit[0], transform: ['translateX(-100%)', 'translateX(0%)'] }, { ...objDefaultAnit[1], duration: time, delay: time / 2 });
    }
    paging(num = 0) {
        super.paging(num);
        if (this.bPagingAni === false) return;
        this.pagingAniSet(this.pagingEle[num]);
    }
    pagingAniSet(ele) {
        const wid = ele.getBoundingClientRect().left + ele.getBoundingClientRect().width - this.spanDot.getBoundingClientRect().width + 10 - ele.parentElement.getBoundingClientRect().left;
        const ani = [
            { transform: ['', `translateX(${wid}px)`], opacity: [0, 1] },
            { duration: 400, fill: 'forwards' },
        ];
        this.spanDot.animate(...ani);
    }
}

// main visual rolling
const ulMainVisu = document.querySelector('#visual .main-vis-banner');
const liPagingVisu = document.querySelectorAll('#visual .main-vis-paging ul li');
const btnPrevVisu = document.querySelector('#visual .main-vis-paging .prev');
const btnNextVisu = document.querySelector('#visual .main-vis-paging .next');
const btnsVisuGo = document.querySelectorAll('#visual .main-vis-banner li .title p a');
const arrGoVisURL = ['price.html', 'price.html', 'inquiry.html'];
const cRollVisu = new CMakeRollBanner(ulMainVisu);
cRollVisu.pagingEle = liPagingVisu;
cRollVisu.init();
btnPrevVisu.addEventListener('click', (e) => cRollVisu.setRoll(cRollVisu.nCurNode - 1));
btnNextVisu.addEventListener('click', (e) => cRollVisu.setRoll(cRollVisu.nCurNode + 1));
btnsVisuGo.forEach((item, idx) => {
    item.addEventListener('mouseenter', (e) => cRollVisu.stopRoll());
    item.addEventListener('mouseleave', (e) => cRollVisu.startRoll());
    item.addEventListener('click', (e) => {
        location.href = arrGoVisURL[idx];
    });
});

// area1 hover event
const ulArea1 = document.querySelector('.main .main-area1 .sol-listing');
const imgArea1 = document.querySelector('.main .main-area1 .sol-bn img');
const divArea1 = [...document.querySelectorAll('.main .main-area1 .sec-title')];
const [liArea1, arrGoA1URL] = [[...ulArea1.children], ['cargo.html', 'port.html', 'ship.html']];
liArea1.forEach((item, idx) => {
    item.addEventListener('mouseenter', (e) => {
        fSetArea1Hover(idx + 1);
    });
    item.addEventListener('click', (e) => {
        location.href = arrGoA1URL[idx];
    });
});
ulArea1.addEventListener('mouseleave', (e) => {
    fSetArea1Hover(0);
});
function fSetArea1Hover(num = 0) {
    divArea1.forEach((item) => item.classList.remove('on'));
    divArea1[num].classList.add('on');
    divArea1[num].animate(...objDefaultAnit);
    imgArea1.animate(...objDefaultAnit);
    imgArea1.setAttribute('src', `images/main/main-area1-img${num === 0 ? '-default' : num - 1}.jpg`);
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
const arrMoreURLA3 = ['ship.html', 'about.html', 'about.html'];
let nCurA3 = 0;
const fRollArea3Bann = (num = 0) => {
    const cnt = arrImgArea3.length;
    const arrCls = ['before', 'on', 'after'];
    // let ani = [{ transform: ['scale(1)', 'scale(1.2)'] }, { duration: 400, fill: 'forward' }];
    const center = 1;
    num = (num < 0 ? cnt - 1 : num) % cnt;
    nCurA3 = num;
    emTextArea3.textContent = arrImgArea3[nCurA3].getAttribute('alt');
    ancTextArea3.setAttribute('href', arrMoreURLA3[nCurA3]);
    for (let i = 0; i < cnt; i++) {
        let tmp = i - center + nCurA3;
        tmp = (tmp < 0 ? cnt + tmp : tmp) % cnt;
        // if (i === center) {
        //     // arrImgArea3[tmp].style.transition = 'none';
        //     // arrImgArea3[tmp].animate(...ani);
        // } //else arrImgArea3[tmp].style.transition = 'all 0.4s';
        arrImgArea3[tmp].classList.remove(arrImgArea3[tmp].className);
        arrImgArea3[tmp].classList.add(arrCls[i]);
    }
    divTextArea3.animate({ ...objDefaultAnit[0], transform: ['translateY(50px)', 'translateY(0)'] }, { duration: 1000 });
};
ancTextArea3.setAttribute('href', arrMoreURLA3[0]);
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
cRollArea4.bPagingAni = true;
cRollArea4.init();
ulRollArea4.addEventListener('mouseenter', (e) => {
    cRollArea4.stopRoll();
});
ulRollArea4.addEventListener('mouseleave', (e) => {
    cRollArea4.startRoll();
});
ancRollArea4.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        cRollArea4.pagingAniSet(item);
    });
});

// area6 scroll
const btnContentCard = document.querySelectorAll('.main .main-area6 article .tab a');
const newslist = document.querySelector('.news-list');
const bloglist = document.querySelector('.blog-list');
const allConList = document.querySelectorAll('.main .main-area6 article .rolling');
const ulCardList = document.querySelectorAll('.main .main-area6 article .rolling .thums');
const spanGageBar = document.querySelectorAll('.main .main-area6 article .rolling .contain .processer span');
const [arrNewsList, arrBlogList] = [strNewsDataURL, blogPost.filter((item) => item.id <= 5)];
let bViewNews = true,
    nLiWidth = 1100;
btnContentCard.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        allConList.forEach(($item) => $item.classList.remove('on'));
        btnContentCard.forEach(($item) => $item.classList.remove('on'));
        item.classList.add('on');
        bViewNews = idx === 0 ? true : false;
        allConList[idx].animate(...objDefaultAnit);
        allConList[idx].classList.add('on');
        // fSetScrollAni(allConList[idx],bViewNews,ulCardList[idx],0);
        // fSetScrollAni(allConList[idx],bViewNews,spanGageBar[idx],1);
    });
});
function fContListInit(list, arr) {
    const ul = list.querySelector('ul');
    const cate = list.className.indexOf('news') >= 0 ? true : false;
    ul.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const pic = document.createElement('img');
        pic.setAttribute('alt', arr[i].title);
        pic.setAttribute('src', `./images/main/area6/${cate === true ? 'news' : 'blog'}-img${i}.jpg`);
        p.append(pic);
        const span = document.createElement('span');
        span.setAttribute('class', 'title');
        span.textContent = arr[i].title;
        li.addEventListener('click', (e) => {
            if (cate === true) location.href = 'news.html?num=' + (i + 1) + '#newsContent';
            else {
                localStorage.setItem('num', i);
                location.href = 'blogPost.html';
            }
        });
        li.append(p, span);
        ul.append(li);
    }
    fSetScrollAni(list, cate, ul, 0);
    fSetScrollAni(list, cate, spanGageBar[cate === true ? 0 : 1], 1);
}
function fSetScrollAni(ele, b, target, n) {
    const num = fGetWidhHeigh(ulCardList[b === true ? 0 : 1]);
    nLiWidth = Number.isNaN(num) ? nLiWidth : num;
    const objScrollWidth = { transform: ['', `translate(${-nLiWidth}px, 730px)`] };
    const objScrollGege = { transform: ['', 'scaleX(1)'] };
    const sTL = new ScrollTimeline({ source: ele });
    target.animate(n === 0 ? objScrollWidth : objScrollGege, { fill: 'forwards', timeline: sTL });
}
function fGetWidhHeigh(list) {
    const li = [...list.children];
    const nMoveWdth =
        li.reduce((acc, crr) => {
            return acc + parseInt(getComputedStyle(crr).marginLeft) + parseInt(getComputedStyle(crr).marginRight) + parseInt(getComputedStyle(crr).width) + parseInt(getComputedStyle(list).getPropertyValue('gap'));
        }, 0) -
        parseInt(getComputedStyle(list).width) -
        parseInt(getComputedStyle(list).getPropertyValue('gap'));
    return nMoveWdth;
}
fContListInit(newslist, arrNewsList);
fContListInit(bloglist, arrBlogList);
