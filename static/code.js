const allowedKeys = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right'
}
const directions = ["up", "down", "left", "right"];

const arrow = (dir) => {
  return `<i class="bi bi-arrow-${dir}-circle-fill" style="font-size: 5rem; color: cornflowerblue;"> </i>`;
};

const reset = () => {
  $(".combo").empty();
  for(let i = 0; i < 8; i++) {
    $(`#input-${i}`).empty();
  }
}

let pos = 0;
let inputted = "";

document.addEventListener('keydown', function(e) {
  const currKey = allowedKeys[e.key]
  if (pos === 0) {
    reset();
  }
  $(`#input-${pos}`).html(arrow(currKey));
  $.post("input", { direction: currKey, pos: pos, inputted: inputted }, (data, status) => {
    pos = data.pos
    inputted = data.inputted
    console.log(data)
    if (data.activateCheats) {
      activateCheats();
    }
  });
  

  // if (!directions.contains(currKey)) {
  //   return;
  // }
  // if (pos < code.length) {
  //   $("#code-input").html(arrow(currKey));
  //   inputted.push(currKey);
  //   pos++;
  // } else if (pos == code.length) {
  //   if (inputted == code) {
  //     activateCheats();
  //   } else {
  //     reset();
  //   }
  // }
});
const activateCheats = () => {
  $.post("submit_code", (data, status) => {
    $(".combo").text(data);
  });
}

