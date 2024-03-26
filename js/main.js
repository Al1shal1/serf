const burger = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')

const links = document.querySelectorAll('.overlay .menu__title'); [1,2,3,4,5,6,7]

links.forEach(function (e){
    e.addEventListener('click', switchMenu );
});

function switchMenu(e){
    e.preventDefault();
    burger.classList.toggle('hamburger--active');
    overlay.classList.toggle('overlay--active');
    body.classList.toggle('body--active');
}
burger.addEventListener('click', switchMenu);


///////////////reviews
const findBlockByName = (name) =>{
    return $('.reviews__item').filter((ndx, item) =>{
    return $(item).attr('data-with')==name;
    });
}


$('.reviews__photo-link').click(e =>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-photo');
    const itemVisible = findBlockByName(target);
    const curItem = $this.closest('.reviews__photo-item');

    itemVisible.addClass('reviews__item--active').siblings().removeClass('reviews__item--active');
    curItem.addClass('reviews__photo-item--active').siblings().removeClass('reviews__photo-item--active');
})

/////////////////team
    const openItem = item =>{
        const container = item.closest(".team__item");
        const contentBlock = container.find(".team__content");
        const textBlock = contentBlock.find(".team__content-wrap");
        const reqHeight = textBlock.height();

        container.addClass("team__item--active");
        contentBlock.height(reqHeight);
    }

    const  closeEveryItem = container => {
        const items = container.find('.team__content');
        const itemContainer = container.find(".team__item");

        itemContainer.removeClass("team__item--active");
        items.height(0);
    }

    $('.team__name').click(e =>{
        e.preventDefault();
        const $this = $(e.currentTarget);
        const container = $this.closest('.team__list');
        const elemContainer = $this.closest(".team__item")

        if(elemContainer.hasClass("team__item--active")) {
            closeEveryItem(container);
            img.toggleClass("team__name-icon--right")
        }else{
            closeEveryItem(container);
            openItem($this);
        }

    })
/////////////////slider
const slider = $(".slider__list").bxSlider({
    pager: false,
    controls:false
});

$('.slider__switch--left').click(e =>{
    slider.goToPrevSlide();

})
$('.slider__switch--right').click(e =>{ 
    slider.goToNextSlide();

});

/////////////////form
const validateFields = (form, FieldsArr) =>{
    FieldsArr.forEach((field) =>{
        field.removeClass("input-error");
        if(field.val() == ""){
            field.addClass("input-error");
        }
    })

    const errorFields = form.find(".input-error");

    return errorFields.length == 0;
}

$('.form').submit(e => {
    e.preventDefault();

    const form =$(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find("modal__content");

    modal.removeClass("error-modal");

    const isValid = validateFields(form, [name,phone,comment,to]);

    if(isValid){
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment:comment.val(),
                to:to.val(),
            },
            headers: {
                'Content-Type': 'application/json'
                    },
                    });

                    request.done(data =>{
                        content.text(data.message);
                        form.value="";
                        //console.log(data);
                        
                    })
                    request.fail(() => {
                        const message = "Ошибка сервера";
                        content.text(message);
                        modal.addClass("error-modal");
                    })
                    request.always(()=> {
                        new Fancybox(
                            [{
                                src: "#modal",
                                type: "inline",
                            }]
                        )
                    })
                };

    $(".js--submit").click(e =>{
        e.preventDefault();
        Fancybox.close();
    })
})