'use strict';
// ------------------------------------- for solution common---------------------------------//
function fSetSolutionMoreBtns(arr) {
    const btns = document.querySelectorAll('.solution .con5.insight-con .cardbanner button');
    btns.forEach((item,idx)=>item.addEventListener('click',e=>location.href=`http://${arr[idx]}`));
}
function fSetSolutionCon3Tab() {
    const ancTabView = document.querySelectorAll('.solution .con3.insight-con .title ul li a');
    const divTabView = document.querySelectorAll('.solution .con3.insight-con .viewer div');
    ancTabView.forEach((item,idx)=>{
        item.addEventListener('click',e=>{
            divTabView.forEach(($item,$idx)=>{
                $item.classList.remove('on')
                ancTabView[$idx].parentElement.classList.remove('on');
            });
            ancTabView[idx].parentElement.classList.add('on');
            divTabView[idx].classList.add('on');
        });
    });
}
function fObserverInit(ele,flag) {
    const opt = {root:null,rooMargin:"50px",threshold:0.5,delay:0};
    const obser = new IntersectionObserver((entries,observer)=>fObserCallbck(entries,observer,ele,flag),opt);
    obser.observe(ele);
    return obser;
}
function fObserCallbck(entries,observer,ele,flag) {
    if(entries[0].intersectionRatio <= 0) return;
    if(entries[0].isIntersecting) {
        if(flag==='video') ele.play();
        if(flag==='balloon') {
            const ani = {opacity:[0,1],transform:["translateY(100%)","translateY(0)"]};
            const aniOpt = {duration:300,fill:'forwards',iterations:1,delay:0};
            [...ele.children].forEach((item,idx)=>{item.animate(ani,{...aniOpt,delay:idx*100})});
        }
        observer.unobserve(ele);
    }
};
function fSolutionVideoSet() {
    const videoDemo = document.querySelector('.solution .con2.insight-con div video');
    videoDemo.addEventListener('click',e=>e.currentTarget.play());
    // const res = fObserverInit(videoDemo,'video');
}
// ------------------------------------- for port page --------------------------------------//
function fPortPageInit() {
    const arrMoreURL = ['./index.html','./news.html'];
    fSetSolutionMoreBtns(arrMoreURL);
    fSetSolutionCon3Tab();
    fSolutionVideoSet();
}
// ------------------------------------- for iotcargo page -----------------------------------//
function fItoCargoPageInit() {
    const arrMoreURL = ['./index.html','./news.html'];
    fSetSolutionMoreBtns(arrMoreURL);
    fSetSolutionCon3Tab();
    fSolutionVideoSet();
    const ul = document.querySelector('.iotcargo .con1 .flexbanner ul');
    const res =fObserverInit(ul,'balloon');
}
// ---------------------------------- delete ----------------------------------//
if (location.pathname.split('/').pop() === 'port.html') {
    fPortPageInit();
}
if (location.pathname.split('/').pop() === 'iotcargo.html') {
    fItoCargoPageInit();
}
