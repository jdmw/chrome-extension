// www.wsi.com.cn/channelwse/ClassBooking.aspx

var win ;
function check(){
  if(win){
    win.reload();
  }else{
    win = window.open('http://www.wsi.com.cn/channelwse/ClassBooking.aspx');
  }

  var inputs = win.document.querySelectorAll('div.banner_table  tbody input[type~=hidden]');
  if(inputs.lengh >0){
     var input = inputs[inputs.lengh-1];
     input.click();
  }else{
     setTimeout(check,1000);
  }
}
check();
