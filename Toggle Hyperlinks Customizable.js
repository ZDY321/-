// ==UserScript==
// @name         Toggle Hyperlinks Customizable
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Enable or disable hyperlinks on a webpage with a fully customizable button
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 用户配置区
    var buttonConfig = {
        bottom: '20px',       // 按钮距底部的距离
        left: '20px',        // 按钮距左侧的距离
        fontSize: '10px',     // 按钮内文字的字体大小
        padding: '3px 9px', // 按钮的内边距，可以调整按钮的大小
        backgroundColor: '#106dbc',  // 按钮的背景色
        textColor: 'white'    // 按钮的文字颜色
    };

    // 创建一个按钮
    var button = document.createElement('button');
    updateButtonStatus(true);  // 初始化按钮状态
    button.style.position = 'fixed';
    button.style.bottom = buttonConfig.bottom;
    button.style.left = buttonConfig.left;
    button.style.zIndex = 1000;
    button.style.padding = buttonConfig.padding;
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.backgroundColor = buttonConfig.backgroundColor;
    button.style.color = buttonConfig.textColor;
    button.style.cursor = 'pointer';
    button.style.fontSize = buttonConfig.fontSize;

    document.body.appendChild(button);

    var linksEnabled = true;

    // 更新按钮状态的函数
    function updateButtonStatus(enabled) {
        button.textContent = `Links: ${enabled ? 'ON' : 'OFF'}`;
    }

    // 绑定按钮点击事件
    button.addEventListener('click', function() {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            if (linksEnabled) {
                links[i].setAttribute('data-href', links[i].href);
                links[i].removeAttribute('href');
            } else {
                links[i].href = links[i].getAttribute('data-href');
            }
        }
        linksEnabled = !linksEnabled;
        updateButtonStatus(linksEnabled);
    });
})();
