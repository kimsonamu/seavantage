class RollLimitNode {
    parentNode = null;
    cNode = null;
    nTotalCnt = 0;
    static evntCTgt = null;
    static onScrollStart = null;
    vCount = 3;
    vCenter = 1;
    maginTopBtm = 50;
    zIndexStart = 5;
    constructor(pEle) {
        this.parentNode = pEle;
        this.cNode = [...this.parentNode?.children];
        this.nTotalCnt = this.cNode.length;
    }
    errMsg(err) {
        console.log(err);
        return {};
    }
    initCNode = (vc = 3, ct = 1) => {
        if (vc < ct || ct < 1 || ct > vc) this.errMsg('check ChildNode Count');
        (this.vCount = vc), (this.vCenter = ct);
        this.pHeight = parseInt(getComputedStyle(this.parentNode).height) - this.maginTopBtm * 2;
        this.cHeight = parseInt(getComputedStyle(this.cNode[0]).height);
        this.pCenter = this.pHeight / 2;
        this.cNode.forEach((item, idx) => {
            item.style.display = 'none';
            item.style.top = `${this.pHeight + this.maginTopBtm * 2}px`;
        });
        this.cNode[0].style.display = 'block';
        this.cNode[0].style.zIndex = this.zIndexStart;
        this.cNode[0].style.top = `${this.pHeight + this.maginTopBtm - this.cHeight}px`;
    };
    run(e) {
        this.evntCTgt = e;
        if (!this.onScrollStart) this.errMsg('set Default Y');
        this.noRollLimit();
    }
    noRollLimit() {
        const middle = 1;
        const bScrollY = this.evntCTgt.deltaY < 0 ? false : true;
        this.nCur = this.nCur || 0;
        this.nCur = (bScrollY > 0 ? ++this.nCur : --this.nCur < 0 ? this.nTotalCnt + this.nCur : this.nCur) % this.nTotalCnt;
        console.log(this.nCur, this.nTotalCnt);
        if (this.nCur >= this.nTotalCnt - 1) {
            this.parentNode.removeEventListener('wheel', (e) => fToolTipScrollInit(e), { passive: false, capture: true });
            console.log('완료');
            return;
        }
        let cVNd = 0,
            block = Math.floor(this.pHeight / this.vCount),
            top = 0,
            z = this.zIndexStart;
        this.cNode.forEach((item) => (item.style.display === 'block' ? ++cVNd : cVNd));
        if (!bScrollY && cVNd <= 1) return;
        const vTmpCnt = Math.min(cVNd + 1, this.vCount);
        let dleri = Math.floor((this.vCount - this.vCenter) / 2),
            tmp = 0;
        dleri = cVNd === 1 ? 0 : dleri;
        this.cNode.forEach((item) => (item.style.display = 'none'));
        if (bScrollY) {
            top = this.pHeight + this.maginTopBtm - vTmpCnt * block;
            for (let i = 0; i < vTmpCnt; i++) {
                tmp = ((cVNd < this.vCount ? middle : this.nCur - 1) - middle + i) % this.nTotalCnt;
                tmp = tmp < 0 ? this.nTotalCnt + tmp : tmp;
                z = i <= dleri ? z + i : z - 1;
                i === vTmpCnt - 1 ? this.cNode[tmp].animate({ opacity: [0, 1] }, { duration: 600, fill: 'forwards', easing: 'ease-in' }) : null;
                if (i >= dleri && i < dleri + this.vCenter) this.cNode[tmp].classList.add('on');
                else this.cNode[tmp].classList.remove('on');
                this.cNode[tmp].style.top = `${top}px`;
                this.cNode[tmp].style.zIndex = z;
                this.cNode[tmp].style.display = 'block';
                top += block;
            }
        } else {
            top = this.pHeight + this.maginTopBtm - block;
            // console.log(top, vTmpCnt, block);
            for (let i = 0; i < vTmpCnt; i++) {
                tmp = ((cVNd < this.vCount ? middle : this.nCur - 1) - middle + i) % this.nTotalCnt;
                tmp = tmp < 0 ? this.nTotalCnt + tmp : tmp;
                z = i <= dleri ? z + i : z - 1;
                if (i === 0) this.cNode[tmp].animate({ opacity: [0, 1] }, { duration: 600, fill: 'forwards', easing: 'ease-in' });
                if (i >= dleri && i < dleri + this.vCenter) this.cNode[tmp].classList.add('on');
                else this.cNode[tmp].classList.remove('on');
                this.cNode[tmp].style.top = `${top}px`;
                this.cNode[tmp].style.zIndex = z;
                this.cNode[tmp].style.display = 'block';
                top -= block;
            }
        }
    }
}
export default RollLimitNode;
