export default {

    tabInit() {

        document.querySelector('body').addEventListener('click', e => {

            let target = e.target;

            if (target.className.indexOf('tab-action') > -1) {

                target.classList.add('selected')

                this.handleAction(target);
            }

        }, false)
    },

    handleAction(target) {

        let actionEle = document.querySelectorAll('.popup-body .tab-action');
        let actionEleArr = Array.prototype.slice.call(actionEle, 0);

        let layoutEle = document.querySelectorAll('.popup-body .layout');
        let layoutEleArr = Array.prototype.slice.call(layoutEle, 0);

        let dataTarget = target.getAttribute('data-target');

        actionEleArr.forEach(e => {

            e.className = e.className.replace('selected', "");
        })

        layoutEleArr.forEach(e => {

            e.style.display = "none";
        })

        document.querySelector(`.popup-body .${dataTarget}`).style.display = "block";

        target.classList.add('selected');
    }
}