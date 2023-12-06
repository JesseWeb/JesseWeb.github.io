$(function () {
    let Animation = function () {
        $('.step1').addClass('active')
        $('.step').each((index, el) => {
            $(el).css({ "z-index": $('.step').length - index })
        })

    }
    Animation.prototype = {
        step: 1,
        animating: false,
        timer:null,
        next: function () {
            if (this.step >= $('.step').length) {
                return
            }
            if (!this.animating) {
                if (this.step >= $('.step').length - 1) {
                    $('.next').hide()
                }
                $('.step' + this.step).removeClass('getBackHere').addClass('fallsDown')
                this.animating = true
                this.step++
                if (this.step == 3) {
                    this.timer = setInterval(this.skillBlingbling, 2000)

                }else{
                    clearInterval(this.timer)
                    this.timer = null
                }
                setTimeout(() => {
                    this.autoAddActive()
                }, 300)
                setTimeout(() => {
                    this.animating = false
                    $('.prev').show()
                }, 1000)
            }
        },
        prev: function () {
            let timer = null
            if (this.step <= 1) {
                return
            }
            if (!this.animating) {
                if (this.step <= 2) {
                    $('.prev').hide()
                }
                this.step--
                if (this.step == 3) {
                    this.timer = setInterval(this.skillBlingbling, 2000)

                }else{
                    clearInterval(this.timer)
                    this.timer = null
                }
                this.autoAddActive()
                $('.step' + this.step).removeClass('fallsDown').addClass('getBackHere')
                this.animating = true
                setTimeout(() => {
                    this.animating = false
                    $('.next').show()
                }, 400)
            }
        },
        autoAddActive() {
            $('.step').removeClass('active')
            $('.step' + this.step).addClass('active')
        },
        skillBlingbling() {
            let liLen = $('.step3 .skill ul li').not('.skill-title').length
            let i = Math.floor(Math.random() * liLen)
            $('.step3 .skill ul li').not('.skill-title').removeClass('blingbling').parent().removeClass('pumpUp')
            $('.step3 .skill ul li').not('.skill-title').eq(i).addClass('blingbling').parent().addClass('pumpUp')
        },
        caclPageIndex(page) {
            if (this.step == page) {
                return true
            } else {
                return false
            }
        }
    }
    let animation = new Animation()
    $('.next').click((e) => {
        animation.next()
    })
    $('.prev').click((e) => {
        animation.prev()
    })
    $(window).on('mousewheel', function (e) {
        e = e || window.event

        if (e.originalEvent.wheelDelta) {
            if (e.originalEvent.wheelDelta === 120) {
                animation.prev()
            } else if (e.originalEvent.wheelDelta === -120) {
                animation.next()
            }
        } else if (e.originalEvent.detail) {
            if (e.originalEvent.detail === -3) {
                animation.prev()
            } else if (e.originalEvent.detail === 3) {
                animation.next()
            }
        }
    });

})