arrow = (dir) => {
    return `<i class="bi bi-arrow-${dir}-circle-fill" style="font-size: 2rem; color: cornflowerblue;"> </i>`;
}

const directions = ['up', 'down', 'left', 'right'];

sequence = () => {
    return $("meta[name='code']").attr('content');
}

cheet(sequence(), {
    next: (str, key) => {
        if (directions.includes(key)) {
            return $(".easter").append(arrow(key));
        } else {
            return $(".easter").append(key);
        }
    },
  
    fail: () => {
        return $(".easter").empty();
    },
  
    done: (str) => {
        console.log("The lockbox is abg");
        window.alert("Check the console logs!");
        return $(".easter").empty();
    }
});
