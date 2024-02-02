const input = [];

const arrow = (dir) => {
  return `<i class="bi bi-arrow-${dir}-circle-fill" style="font-size: 5rem; color: cornflowerblue;"> </i>`;
};

const animateError = () => {
  $('.code-input').addClass( "wrong-input" ).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
    $(this).removeClass( "wrong-input" );
  });
}

const alert = (message, alertType) => {
  return `<div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            <strong class="combo">${message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
}

const checkCode = (input) => {
  $.post("check_code", { 'code': input.join(' ') }, (data, status) => {
    if (data.res) {
      $(".combo").text(data.res);
      $(alert(data.res, 'success')).prependTo("#alerts");
    } else {
      animateError();
      $(alert('Wrong code :(', 'danger')).prependTo("#alerts");
    }
  });
}

const reset = () => {
  // reset input array
  input.length = 0
  // clear display
  $(".combo").empty();
}

/**
 * Detect arrow key presses.
 */
hotkeys('up,down,left,right', (event, handler) => {
  let key = handler.key;
  if (input.length < 8) {
    // add pressed arrow to input array, and display
    $(`#input-${input.length}`).html(arrow(key));
    input.push(key);
    console.log(input)
    // if the input array is the length of the code, check the code
    if (input.length === 8) {
      return checkCode(input);
    }
  } else {
    animateError();
  }
});

/**
 * Detect backspaces for deleting input.
 */
hotkeys('backspace', (event, handler) => {
  input.pop();
  $(`#input-${input.length}`).empty();
  console.log(input)
  $(".combo").empty();
  $("#alerts").empty();
}); 
