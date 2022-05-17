let windowScrollTop = 0;
let windowHeight = $(window).height();
let sectionLength = 0;
let sectionPosition = [];
$('.titleBox .title').each(function () {
  $(this).html(
    $(this).text().replace(/\S/g, "<span class='letter'>$&</span>")
  );
});

function picMove(elm) {
  $(window).on('load resize', function () {
    $(elm).on('mouseenter', function () {
      let currSect = $(this);
      let picHeight = currSect.outerHeight();
      let picImgHeight = currSect.find('img').height();
      let hoverHeight = picImgHeight - picHeight;

      currSect.find('img').css({
        transform: `translateY(-${hoverHeight}px)`,
      });
    });
    $(elm).on('mouseleave', function () {
      let currSect = $(this);
      currSect.find('img').css({
        transform: 'translateY(0px)',
      });
    });
  });
}

function sectionPositionCheck() {
  $('.section').each(function () {
    let currSect = $(this);
    let currSectTop = currSect.offset().top;

    sectionPosition.push(currSectTop);

    if (
      currSectTop < windowScrollTop + windowHeight / 3 &&
      currSectTop + currSect.outerHeight() >
      windowScrollTop + windowHeight / 3
    ) {
      currSect.addClass('active');
      if (sectionLength !== currSect.index()) {
        sectionLength = currSect.index();
        $('.menu li,.side li')
          .removeClass('active')
          .eq(sectionLength - 1)
          .addClass('active');
      }
    } else {
      currSect.removeClass('active');
    }
  });
}

function experience() {
  let thisElm = $('.experience .conBox');
  let experienceHeight = thisElm.height();
  experienceScrollTop =
    windowScrollTop - thisElm.offset().top + windowHeight / 1.5;
  $('.experience .line').css({
    height: experienceScrollTop + 'px',
  });

  $('.experience .conBox li').each(function () {
    let currSect = $(this);
    let currSectTop = currSect.position().top;
    if (experienceScrollTop >= currSectTop) {
      currSect.addClass('active');
    } else {
      currSect.removeClass('active');
    }
  });
}
  $(window).on('load scroll resize', function () {
    windowScrollTop = $(window).scrollTop();
    windowWidth = $(window).width();
    sectionPositionCheck();
    experience();
  });

  $('.menu li,.side li').click(function () {
    let menuLiLength = $(this).index() + 1;
    $('.menu li,.side li').removeClass('active');
    $(this).addClass('active');
    $('html').animate({
        scrollTop: sectionPosition[menuLiLength] + 50,
      },
      1000
    );
  });