// -------------------------
//  RATING - COUNT ANIMATION
// -------------------------
const counters = document.querySelectorAll('.count');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target'); //convert to number
        const count = +counter.innerText.replace(/\D/g, ''); //remove non-digit character

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes("Years") ? "+ Years" : counter.innerText.includes("+") ? "+" : "%");
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target + (counter.innerText.includes("Years") ? "+ Years" : counter.innerText.includes("+") ? "+" : "%");
        }
    };
    updateCount();
});