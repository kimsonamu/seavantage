const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const $links = getAll('a[href="#"]');
$links.forEach((links) => {
    links.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

const navi = () => {};

const subComInit = () => {
    const getPage = (page, tag) => {
        fetch(page)
            .then((res) => res.text())
            .then((res) => {
                get(tag).innerHTML = res;

                // 헤더푸터 생성 후 내부 기능 함수 호출! (!)
                navi();
            });
    };
    getPage('../page/header.html', '#header .type');
    getPage('../page/footer.html', '#footer');
};

(() => {
    subComInit();
})();
