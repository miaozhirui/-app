//Vue的指令

export default {

    install(Vue) {
        
        //点击的时候添加class
        Vue.directive('click-change-style', {

            bind:(el, binding) => {

                let hightLight = binding.arg;

                el.addEventListener('touchstart', () => {

                    el.classList.add(hightLight); 
                }, false)

                el.addEventListener('touchend', () => {

                    el.className = el.className.replace(hightLight, '');
                })

                el.addEventListener('touchcancel', () => {

                    el.className = el.className.replace(hightLight, '');
                })

                el.addEventListener('touchmove', () => {

                    el.className = el.className.replace(hightLight, '');
                })
            }
        })

        //显示图片
        Vue.directive('show-image', {

            bind: (el, binding) => {

                let value = binding.value;

                el.setAttribute('style', `background: url(${value}) no-repeat center; background-size:cover`);
            },

            update: (el, binding) => {

                let value = binding.value;

                el.setAttribute('style', 'background: url(${value}) no-repeat center; background-size:cover');
            }
        })

        //input获得焦点的样式
        Vue.directive('focus',{

            bind:(el, binding) => {

                let hightLight = binding.value.class,
                    otherEl = binding.value.el;

                Vue.nextTick(() => {

                    let lastEl = otherEl ? document.querySelector(`.${otherEl}`) : el;

                    el.addEventListener('focus', () => {

                        lastEl.classList.add(hightLight);
                    })

                    el.addEventListener('blur', () => {

                        lastEl.className = lastEl.className.replace(hightLight, '');
                    })
                })
            }
        })
    }
}