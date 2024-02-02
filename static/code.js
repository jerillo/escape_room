const input = []

const arrow = (dir) => {
  return `<i class="bi bi-arrow-${dir}-circle-fill" style="font-size: 5rem; color: cornflowerblue;"> </i>`;
};

const checkCode = (input) => {
  $.post("check_code", { 'code': input.join(' ') }, (data, status) => {
    if (data.res) {
      $(".combo").text(data.res);
      // disable hotkeys once code is correct
      hotkeys.unbind();
    } else {
      reset();
    }
  });
}

const reset = () => {
  // reset input array
  input.length = 0
  // clear display
  $(".combo").empty();
  for(let i = 0; i < 8; i++) {
    $(`#input-${i}`).empty();
  }
}

/**
 * Detect arrow key presses.
 */
hotkeys('up,down,left,right', (event, handler) => {
  let key = handler.key;
  // add pressed arrow to input array, and display
  $(`#input-${input.length}`).html(arrow(key));
  input.push(key);
  // if the input array is the length of the code, check the code
  if (input.length === 8) {
    checkCode(input);
  }
});

/**
 * Detect backspaces.
 */
hotkeys('backspace', (event, handler) => {
  input.pop();
  $(`#input-${input.length}`).empty();
});
