require('./style/index.less');

window.onload = window.onresize = function(){
  var per = $('.wrapper .cover .per');
  var tr = $('.trainlist .pctable .tr');
  var info = $('.trainlist .pctable .info');
  $('.wrapper .cover .per').unbind('click');
  $('.pctable .tbody .tr').unbind('click');
  if (!G.mobile) {
    $('.per .icon').removeClass('selected');
    $('.mobiletable').css('display', 'none');
    $('.pctable .tbody .tr').each(function(){
      $(this).click(function(){
        $(this).children('.icon').toggleClass('selected');
        $(this).next('.info').slideToggle();
        if($(this).children('.icon').hasClass('selected')){
          $(this).css('background','#42B9E5');
          $(this).css('color','#fff');
          $(this).children('.icon').css('color','#fff');
        } else {
          $(this).css('background','#F7F9FA');
          $(this).css('color','#2C2C2C');
          $(this).children('.icon').css('color','#42B9E5');
        }
      });
    });
    per.each(function() {
      $(this).on({
        click: function(e) {
          var type = $(this).data('course-type');
          $(this).addClass('selected').siblings(per).removeClass('selected');
          if (type == 'all') {
            $('.pctable .tbody .tr').css('background','#F7F9FA');
            $('.pctable .tbody .tr').css('color','#2C2C2C');
            $('.pctable .tbody .tr .icon').css('color','#42B9E5');
            $('.pctable .tbody .tr .icon').removeClass('selected');
            tr.addClass('selected');
          } else {
            tr.removeClass('selected');
            tr.each(function() {
              if ($(this).data('course-type') === type) {
                $('.pctable .tbody .tr').css('background','#F7F9FA');
                $('.pctable .tbody .tr').css('color','#2C2C2C');
                $('.pctable .tbody .tr .icon').css('color','#42B9E5');
                $('.pctable .tbody .tr .icon').removeClass('selected');
                $(this).addClass('selected');
              }
            });
          }
          $('.pctable .tbody .info').css('display','none');
        }
      });
    });
  }
  if(G.mobile){
    $('.wrapper .cover .per').unbind('click');
    $('.wrapper .cover .per').each(function(){
      $(this).click(function(){
        var type = $(this).data('course-type');
        if (type == 'all') {
          info.addClass('selected');
        } else {
          info.removeClass('selected');
          info.each(function() {
            if ($(this).data('course-type') === type) {
              $(this).addClass('selected');
            }
          });
        }
        $(this).children('.icon').toggleClass('selected');
        $(this).next('.mobiletable').slideToggle();
      });
    });
  }
};