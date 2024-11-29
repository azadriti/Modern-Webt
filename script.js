const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y:0,
            ease:Expo.easeInOut,
            delay: -1,
            duration: 2,
            stagger: .2
        })
        tl.from("#herofooter", {
            y: -10,
            opacity: 0,
            delay:-1,
            duration: 1.5,
            ease: Expo.easeInOut
        })
}

function circleEllipse() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;  
    var yprev = 0;  
    
    
    var xdiff = 0;
    var ydiff = 0;

    window.addEventListener("mousemove", function(dets) {
        // Calculate the differences between the current and previous positions
        xdiff = dets.clientX - xprev;
        ydiff = dets.clientY - yprev;

        // Clamp the scale values to keep them within a range (0.8 - 1.2)
        xscale = gsap.utils.clamp(0.8, 1.2, 1 + xdiff / 100);
        yscale = gsap.utils.clamp(0.8, 1.2, 1 + ydiff / 100);

        
        xprev = dets.clientX;
        yprev = dets.clientY;

        // Call the circleMouseFollower function with the calculated scales
        circleMouseFollower(xscale, yscale);
    });
}
circleEllipse();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector("#minicircle").style.transform = 
            `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

firstPageAnim();

document.querySelectorAll('.elem').forEach((elem) => {
    const img = elem.querySelector('img');
    
    elem.addEventListener('mousemove', (e) => {
        img.style.opacity = 1;  
        img.style.left = e.clientX - elem.getBoundingClientRect().left + 'px';
        img.style.top = e.clientY - elem.getBoundingClientRect().top + 'px';
    });

    elem.addEventListener('mouseleave', () => {
        img.style.opacity = 0;  
    });
});

function updateTime() {
    const timeElement = document.querySelector("#footerleft h5:nth-child(2)"); 
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        timeElement.textContent = `${hours}:${minutes}:${seconds} IST`; 
    }, 1000); 
}

updateTime();

