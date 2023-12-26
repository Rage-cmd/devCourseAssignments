let counter = 0;

function count() {
    setTimeout(
        () => {
            console.log(counter);
            counter += 1;
            count();
        }, 1*1000
    )
}

count();

