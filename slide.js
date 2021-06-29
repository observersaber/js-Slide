var counter = 0,
    slide = document.getElementById("slide"),
    slideBox = slide.getElementsByClassName('box')[0],
    items = slideBox.querySelectorAll("div"),
    nav = slide.getElementsByClassName("nav")[0],
    dot = new Array;
for (var i = 0, item; item = items[i]; i++)dot[i] = document.createElement("a"),
    dot[i].classList.add("dot"), nav.appendChild(dot[i]);

items[0].style.transform = "translateX(0%)",
    dot[0].classList.add("dotA");

slide.addEventListener("click", function () {
    var target = event.srcElement || event.target;
    switch (target.className) {
        case "next": switchImg(counter + 1);
            break;
        case "prev": switchImg(counter - 1);
            break;
        case "dot": switchImg(dot.indexOf(target))
    }
})

slideBox.addEventListener("mousedown", function (e) {
    var e = e || window.event,
        target = e.srcElement || e.target;
    if (e.button != 0) return

    var downP = e.pageX;
    var throttleFn = throttle(slidemove, 10);

    if ("DIV" == target.tagName) {
        e.preventDefault();
        slideBox.style.cursor = "grabbing";
        var nextB = range(counter + 1),
            prevB = range(counter - 1);
        items[nextB].style.transition = "transform 0s",
            items[prevB].style.transition = "transform 0s",
            items[counter].style.transition = "transform 0s",
            interval = clearInterval(interval);

        document.addEventListener("mousemove", Mmove)
        document.addEventListener("mouseup", Mup)
    }
    function Mmove() {
        throttleFn(downP, nextB, prevB)
    }
    function Mup(e) {
        var upP = e.pageX;
        slideBox.style.cursor = "",
            items[counter].style.transition = "",
            items[nextB].style.transition = "",
            items[prevB].style.transition = "";

        switchImg(downP > upP ? counter + 1 : downP < upP ? counter - 1 : counter, true);

        document.removeEventListener("mousemove", Mmove)
        document.removeEventListener("mouseup", Mup)
    }
});

function throttle(fn, delay) {
    var previous = 0;
    return function () {
        var _this = this;
        var args = arguments;
        var now = new Date();
        if (now - previous > delay) {
            fn.apply(_this, args);
            previous = now;
        }
    }
}

function slidemove(f, g, h) {
    var e = e || window.event;
    items[counter].style.transform = "translateX(" + (items[counter].scrollLeft - f + e.pageX) / items[counter].clientWidth * 100 + "%)";
    if (f > e.pageX) {
        items[g].style.transform = "translateX(" + (items[counter].clientWidth - f + e.pageX) / items[counter].clientWidth * 100 + "%)";
        items[h].style.transform = "";
    } else if (f < e.pageX) {
        items[h].style.transform = "translateX(" + (-items[counter].clientWidth - f + e.pageX) / items[counter].clientWidth * 100 + "%)";
        items[g].style.transform = "";
    }
}

function switchImg(a, b) {
    interval = clearInterval(interval);
    showCurrent(counter, a, b);
    interval = setInterval(function () { showCurrent(counter, counter + 1) }, 5500)
}

function range(a) {
    return a >= items.length ? 0 : 0 > a ? items.length - 1 : a
}

function showCurrent(a, b, c) {
    if (a == b) { return }
    dot[counter].classList.remove("dotA");
    if (!c) { items[a].style.animationName = (a < b) ? "FOL" : "FOR" }
    items[a].style.transform = (a < b) ? "translateX(-100%)" : "translateX(100%)";
    counter = range(b);
    if (!c) { items[counter].style.animationName = (a < b) ? "FIR" : "FIL" }
    items[counter].style.transform = "translateX(0%)"
    dot[counter].classList.add("dotA");
}
var interval = window.setInterval(function () { showCurrent(counter, counter + 1) }, 5500);
!function () { !function () { var a = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup" }; for (originalType in a) document.addEventListener(originalType, function (b) { "click" != b.type && ("touchstart" != b.type && "touchmove" != b.type && "touchend" != b.type && b.preventDefault(), event = document.createEvent("MouseEvents"), touch = b.changedTouches[0], event.initMouseEvent(a[b.type], !0, !0, window, 0, touch.screenX, touch.screenY, touch.clientX, touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey, touch.metaKey, 0, null), b.target.dispatchEvent(event), event.preventDefault()) }) }() }();