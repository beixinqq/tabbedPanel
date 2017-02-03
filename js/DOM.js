/**
 * Created by qiubeixin on 2017/2/3.
 */
var DOM = {};
DOM.getIndex = function (ele) {
    var n = 0;
    var prev = ele.previousSibling;
    while (prev) {
        if (prev.nodeType === 1) {
            n++;
        }
        prev = prev.previousSibling;
    }
    return n;
};

DOM.siblings = function (ele) {
    var a = [];
    var allEles = ele.parentNode.childNodes;
    for (var i = 0; i < allEles.length; i++) {
        var tempEle = allEles[i];
        if (tempEle.nodeType === 1 && tempEle != ele) {
            a.push(tempEle);
        }
    }
    return a;
};

DOM.prevSiblings1 = function (ele) {
    var a = [];
    var prev = ele.previousSibling;
    while (prev) {
        if (prev.nodeType === 1) {
            a.push(prev);
        }
        prev = prev.previousSibling;
    }
    return a;
};

DOM.prevSiblings2 = function (ele) {
    var a = [];
    var allEles = ele.parentNode.childNodes;
    for (var i = 0; i < allEles.length; i++) {
        var tempEle = allEles[i];
        if (tempEle == ele)return a;
        if (tempEle.nodeType === 1) {
            a.push(tempEle);
        }
    }
    return a;
};

DOM.nextSiblings1 = function (ele) {
    var a = [];
    var next = ele.nextSibling;
    while (next) {
        if (next.nodeType === 1) {
            a.push(next);
        }
        next = next.nextSibling;
    }
    return a;
};

DOM.nextSiblings2 = function (ele) {
    var flag = false, a = [];
    var allEles = ele.parentNode.childNodes;
    for (var i = 0; i < allEles.length; i++) {
        var tempEle = allEles[i];
        if (tempEle.nodeType === 1 && flag) {
            a.push(tempEle);
        }
        if (tempEle == ele)flag = true;
    }
    return a;
};

DOM.nextSiblings3 = function (ele) {
    var a = [];
    var allEles = ele.parentNode.childNodes;
    var i = allEles.length - 1;
    while (i >= 0) {
        if (allEles[i] == ele)return a;
        if (allEles[i].nodeType == 1) {
            a.push(allEles[i]);
        }
        i--;
    }
    return a;
};

DOM.prev1 = function (ele) {
    if (ele.previousElementSibling) {
        return ele.previousElementSibling;
    }
    var prev = ele.previousSibling;
    while (prev) {
        if (prev.nodeType == 1) {
            return prev;
        }
        prev = prev.previousSibling;
    }
    return null;
};

DOM.next = function (ele) {
    if (ele.nextElementSibling) {
        return ele.nextElementSibling;
    }
    var next = ele.nextSibling;
    while (next) {
        if (next.nodeType === 1) {
            return next;
        }
        next = next.nextSibling;
    }
    return null;
};

DOM.children1 = function (parent, tagName) {
    var childs = parent.childNodes;
    var a = [];
    if (tagName === undefined) {
        for (var i = 0; i < childs.length; i++) {
            var child = childs[i];
            if (child.nodeType === 1) {
                a.push(child);
            }
        }
    } else if (typeof tagName === 'string') {
        for (var i = 0; i < childs.length; i++) {
            var child = childs[i];
            tagName = tagName.toUpperCase();
            if (child.tagName === tagName) {
                a.push(child);
            }
        }
    }
    return a;
};

DOM.children2 = function (parent, tagName) {
    var childs = parent.childNodes;
    var a = [];
    if (tagName == undefined) {
        var reg = /^[A-Z]\w*$/;
    } else if (typeof tagName === 'string') {
        var reg = new RegExp('^' + tagName.toUpperCase() + '$');
    }
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        if (child.nodeType === 1 && reg.exec(child.nodeName)) {
            a.push(child);
        }
    }
    return a;
};

DOM.getByClassName = function (strclass, context) {
    context = context || document;
    var eles = context.getElementsByTagName('*');
    if (context.getElementsByClassName) {
        return context.getElementsByClassName(strclass);
    }

    var aClass = strclass.replace(/^ +| +$/g, '').split(/ +/);
    for (var ii = 0; ii < aClass.length; ii++) {
        var a = [];
        var reg = new RegExp('(?:^| )' + aClass[ii] + '(?: |$)');
        for (var i = 0; i < eles.length; i++) {
            if (reg.test(eles[i])) {
                a.push(eles[i]);
            }
        }
        eles = a;
    }
    return eles;
};

DOM.addClass = function (ele, strclass) {
    var reg = new RegExp('(?:^| )' + strclass + '(?: |$)');
    if (!reg.test(ele.className)) {
        ele.className += ' ' + strclass;
    }
};

DOM.removeClass = function (ele, strClass) {
    var reg = new RegExp('(?:^| )' + strClass + '(?: |$)');
    ele.className = ele.className.replace(reg, '');
};

DOM.prepend = function (parent, childNode) {
    if (parent.firstChild) {
        parent.insertBefore(childNode, parent.firstChild);
    } else {
        parent.appendChild(childNode);
    }
};

DOM.insertAfter = function (newEle, oldEle) {
    var next = oldEle.nextSibling;
    if(next){
        oldEle.parentNode.insertBefore(newEle,next);
    }else{
        oldEle.parentNode.appendChild(newEle);
    }
};