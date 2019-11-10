$(document).ready(function() {
  console.log('ready!');

  // Part 1
  $('#theOne').on('click', function() {
    if ($(this).is(':checked')) {
      alert('fine');
      // Show checkbox
    } else {
      $('.checked').prop('checked', false);
      // Hide checkbox
      slideArray = [];
      $('.overlay-content').text();
      $('.overlay-content').slick('slickRemove', null, null, true);
      handlerItemCount(slideArray);
    }
  });

  // Part 2
  $('.link-item').on('click', function() {
    // Main menu display
    var index = $(this).index();
    if (
      $(this)
        .children()
        .hasClass('blue')
    ) {
      $('.submenu-outer')
        .children()
        .css('display', 'none');
      $('#submenu-close').css('display', 'none');
      $(this).removeClass('actived');
      $(this)
        .children()
        .removeClass('blue')
        .addClass('yellow');
    } else {
      $('.submenu-outer')
        .children()
        .css('display', 'none');
      $('.submenu')[index].style.display = 'block';
      $('#submenu-close').css('display', 'block');
      $('.link-item').removeClass('actived');
      $(this).addClass('actived');
      $('.link-item')
        .children()
        .removeClass('blue actived')
        .addClass('yellow');
      $(this)
        .children()
        .removeClass('yellow')
        .addClass('blue actived');
    }
  });

  $('#submenu-close').on('click', function() {
    $('.submenu-outer')
      .children()
      .css('display', 'none');
    $('.link-item').removeClass('actived');
    $('.link-item')
      .children()
      .removeClass('blue')
      .addClass('yellow');
  });

  // Slick Part 3
  var slideArray = [];
  $('.overlay-content').slick({
    slidesToShow: 4,
    slidesToScroll: 1
  });
  $('.checked').on('click', function() {
    var id = $(this)
      .parent()
      .parent()
      .data('id');
    var heading = $(this)
      .parent()
      .parent()
      .find('h1')
      .text();
    var text = $(this)
      .parent()
      .parent()
      .find('p')
      .text();
    var newObj = { id: id, head: heading, txt: text };
    if ($(this).is(':checked')) {
      slideArray.push(newObj);
      addSlide(newObj);
      handlerItemCount(slideArray);
    } else {
      var searchTerm = newObj.id;
      var slideIndex = -1;
      for (var i = 0; i < slideArray.length; i++) {
        if (slideArray[i].id === searchTerm) {
          slideIndex = i;
          break;
        }
      }
      slideArray = $.grep(slideArray, function(i) {
        return i.id != newObj.id;
      });
      removeSlide(slideIndex);
      handlerItemCount(slideArray);
    }
  });

  function addSlide(obj) {
    $('.overlay-content').slick(
      'slickAdd',
      '<div data-id=' +
        obj.id +
        ' class="overlay-card"><h3>' +
        obj.head +
        '</h3><span class="remove-card">&times;</span></div>'
    );
    removeCard();
  }

  function removeSlide(Index) {
    $('.overlay-content').slick('slickRemove', Index);
  }

  function handlerItemCount(arr) {
    $('.item-count').text(arr.length);
    if (arr.length > 0) {
      $('.overlay').css({ opacity: 1, 'z-index': 1 });
    } else {
      $('.overlay').css({ opacity: 0, 'z-index': -99 });
    }
    if (arr.length === 10) {
      $('.checked:not(:checked)').attr('disabled', true);
    } else {
      $('.checked:not(:checked)').prop('disabled', false);
    }
  }

  // Remove Btn
  function removeCard(arr) {
    $('.remove-card').on('click', function(e) {
      if (event.handled !== true) {
        //put your code here
        console.log('click');
        var removeId = $(this)
          .parent()
          .data('id');

        var target = $('.item[data-id=' + removeId + ']').find('.checked');
        console.log(target);
        target.trigger('click');
        event.handled = true;
      }
      return false;
    });
  }
});
