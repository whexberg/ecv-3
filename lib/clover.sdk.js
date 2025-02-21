export var Clover = (function (e) {
    console.log(e);
    var t = {};
    function n(o) {
        if (t[o]) return t[o].exports;
        var r = (t[o] = { i: o, l: !1, exports: {} });
        return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
        (n.m = e),
        (n.c = t),
        (n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
        }),
        (n.r = function (e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(e, '__esModule', { value: !0 });
        }),
        (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (
                (n.r(o),
                Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
                2 & t && 'string' != typeof e)
            )
                for (var r in e)
                    n.d(
                        o,
                        r,
                        function (t) {
                            return e[t];
                        }.bind(null, r),
                    );
            return o;
        }),
        (n.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return n.d(t, 'a', t), t;
        }),
        (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ''),
        n((n.s = 9))
    );
})([
    function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var o = n(2);
        (t.paymentElements = [
            'CARD',
            'CARD_NAME',
            'CARD_CVV',
            'CARD_DATE',
            'CARD_NUMBER',
            'CARD_POSTAL_CODE',
            'CARD_STREET_ADDRESS',
            'CARD_PHONE_NUMBER',
            'CARD_EMAIL_ADDRESS',
            'PAYMENT_REQUEST_BUTTON',
            'ACH_ELEMENTS',
            'GIFT_CARD_ELEMENTS',
            'PAYMENT_REQUEST_BUTTON_APPLE_PAY',
        ]),
            (t.localeSupported = ['en', 'en-CA', 'fr-CA']),
            (t.BASE_HOST = o.determineEnv().origin),
            (t.isDev = function (e) {
                return ['.dev.clover', 'sandbox.dev.clover', 'localhost'].some(function (t) {
                    return e.includes(t);
                });
            });
        var r = t.BASE_HOST + '/widget.html';
        t.buildUrl = function (e, t, n, o, a, i, s, l, c, d, u, p) {
            var m = { baseOrigin: e, element: t, origin: document.location.origin };
            n && (m.apiKey = n),
                o && (m.mId = o),
                a && (m.styles = JSON.stringify(a)),
                i && (m.paymentRequest = JSON.stringify(i)),
                l && (m.applePaymentRequest = JSON.stringify(l)),
                c && (m.sessionIdentifier = c),
                d && (m.domainHost = d),
                s && (m.locale = s),
                u && (m.showPhoneTypeDropDown = u),
                p && (m.phoneNumberMask = p);
            var h = Object.keys(m)
                .map(function (e) {
                    return e + '=' + encodeURIComponent(m[e]);
                })
                .join('&');
            return r + '?' + h;
        };
    },
    function (e, t, n) {
        'use strict';
        var o =
            (this && this.__assign) ||
            function () {
                return (o =
                    Object.assign ||
                    function (e) {
                        for (var t, n = 1, o = arguments.length; n < o; n++)
                            for (var r in (t = arguments[n]))
                                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                        return e;
                    }).apply(this, arguments);
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var r,
            a,
            i,
            s,
            l,
            c,
            d = n(0),
            u = null,
            p = !1;
        (t.initElemMaps = function () {
            a = new Map();
            var e = {
                change: null,
                focus: null,
                blur: null,
                paymentMethod: null,
                paymentMethodStart: null,
                paymentMethodEnd: null,
            };
            (i = new Map()).set('CARD_NUMBER', e),
                i.set('CARD_DATE', e),
                i.set('CARD_CVV', e),
                i.set('CARD_POSTAL_CODE', e),
                i.set('CARD_NAME', e),
                i.set('CARD_STREET_ADDRESS', e),
                i.set('CARD_PHONE_NUMBER', e),
                i.set('CARD_EMAIL_ADDRESS', e),
                i.set('PAYMENT_REQUEST_BUTTON', e),
                i.set('PAYMENT_REQUEST_BUTTON_APPLE_PAY', e),
                i.set('ACH_ELEMENTS', e),
                i.set('GIFT_CARD_ELEMENTS', e);
        }),
            (t.initMessageElement = function (e) {
                u = e;
            }),
            (t.registerElementIdMapping = function (e, t) {
                a.set(e, t);
            }),
            (t.registerElementEventListener = function (e, t, n) {
                if (!['blur', 'change', 'focus', 'paymentMethod', 'paymentMethodStart', 'paymentMethodEnd'].includes(t))
                    throw new Error('This event is not yet supported.');
                if (i.has(e) && i.get(e)[t])
                    throw new Error(t + ' event is already registered on ' + e.toString() + '.');
                var r = i.get(e),
                    a = Object.keys(r).reduce(
                        function (e, r) {
                            var a;
                            return r === t ? o(o({}, e), (((a = {})[t] = n), a)) : e;
                        },
                        o({}, r),
                    );
                i.set(e, a);
            }),
            (t.removeElementEventListener = function (e, t) {
                if (!i.has(e) || !i.get(e)[t]) throw new Error(t + ' is not registered on ' + e.toString() + '.');
                var n = i.get(e),
                    r = Object.keys(n).reduce(
                        function (e, n) {
                            var r;
                            return n === t ? o(o({}, e), (((r = {})[t] = null), r)) : e;
                        },
                        o({}, n),
                    );
                i.set(e, r);
            }),
            (t.onBlurEvent = function (e) {
                if (e && e.data) {
                    var t = e.data,
                        n = t.realTimeFormState,
                        o = t.elementType;
                    i.has(o) && i.get(o).blur && i.get(o).blur(n);
                }
            }),
            (t.onFocusEvent = function (e) {
                if (e && e.data) {
                    var t = e.data,
                        n = t.realTimeFormState,
                        o = t.elementType;
                    i.has(o) && i.get(o).focus && i.get(o).focus(n);
                }
            }),
            (t.onTokenizedWallet = function (e) {
                if (e && e.data) {
                    var t = e.data,
                        n = t.responseData,
                        o = t.elementType;
                    i.has(o) && i.get(o).paymentMethod && i.get(o).paymentMethod(n);
                }
            }),
            (t.onWalletWindowOpen = function (e) {
                if (e && e.data) {
                    var t = e.data,
                        n = t.responseData,
                        o = t.elementType;
                    i.has(o) && i.get(o).paymentMethodStart && i.get(o).paymentMethodStart(n);
                }
            }),
            (t.onWalletWindowClose = function (e) {
                if (e && e.data) {
                    var t = e.data,
                        n = t.responseData,
                        o = t.elementType;
                    i.has(o) && i.get(o).paymentMethodEnd && i.get(o).paymentMethodEnd(n);
                }
            }),
            (t.setupAchModal = function () {
                t.renderAchModal();
            });
        var m = function () {
            return new Promise(function (e, t) {
                try {
                    s || t();
                    var n = s.getResponse();
                    n || t(), u.onRecaptchaExecute(l, n), e();
                } catch (e) {
                    console.error(e), t();
                } finally {
                    s.reset(), (p = !1);
                }
            });
        };
        t.executeRecaptcha = function (e) {
            var t;
            if (null === (t = e) || void 0 === t ? void 0 : t.data) {
                var n = e.data.hash;
                (l = n),
                    s
                        ? p ||
                          (s.execute(),
                          (p = !0),
                          setTimeout(function () {
                              var e = document.querySelector('iframe[title^="recaptcha challenge"]');
                              if (e) {
                                  var t = e.parentElement;
                                  (t.style.transform = 'translate(0%, -25%)'),
                                      (t.style.position = 'fixed'),
                                      (t.style.top = '25%'),
                                      t.previousElementSibling.addEventListener('click', function () {
                                          return (p = !1);
                                      });
                              }
                          }, 0))
                        : u.onRecaptchaExecute(l);
            }
        };
        (t.renderCaptchaFromIframe = function (e) {
            var t,
                n = e.data.renderCaptchaFromIframe;
            'function' == typeof window.CustomEvent
                ? (t = new CustomEvent('renderReCaptcha', { detail: { renderCaptchaFromIframe: n } }))
                : (t = document.createEvent('CustomEvent')).initCustomEvent('renderReCaptcha', !0, !1, {
                      renderCaptchaFromIframe: n,
                  }),
                document.dispatchEvent(t);
        }),
            (t.renderRecaptchaContainer = function (e) {
                if (!window.grecaptcha && !document.getElementById('recaptcha-container')) {
                    (c = e),
                        (function () {
                            var e = document.createElement('div');
                            e.setAttribute('id', 'recaptcha-container'), document.body.appendChild(e);
                        })();
                    var t = document.createElement('script');
                    (t.src = 'https://www.google.com/recaptcha/api.js?render=explicit'),
                        (t.async = !0),
                        (t.defer = !0),
                        (t.onload = function () {
                            return (function () {
                                s = grecaptcha;
                                var e = d.isDev(c)
                                    ? '6LeAwzskAAAAAK1izoAiIagfQMZs6RSyDVwM02_d'
                                    : '6Lf2VrokAAAAALdORPlUczBhOU5uPw2j1tLlO3kZ';
                                s.ready(function () {
                                    s.render('recaptcha-container', { sitekey: e, size: 'invisible', callback: m });
                                });
                            })();
                        }),
                        document.body.appendChild(t);
                }
            }),
            (t.onAchAgreementFetch = function (e) {
                if (e.data) {
                    var t = document.getElementsByClassName('clover-ach-modal')[0],
                        n = document.getElementsByClassName('clover-ach-modal-content')[0];
                    if (!t || !n) throw Error('Cannot find ach modal to render agreement content.');
                    var o = e.data;
                    n.innerHTML = o.agreementData;
                }
            });
        (t.onChangeEvent = function (e) {
            if (e && e.data) {
                var t = e.data,
                    n = t.realTimeFormState,
                    o = t.elementType;
                i.has(o) && i.get(o).change && i.get(o).change(n);
            }
        }),
            (t.resizeFrame = function (e) {
                var t, n;
                if (e) {
                    var o = a.get(e.sender);
                    if (o) {
                        var r = document.getElementById(o);
                        if (
                            null === (n = null === (t = r) || void 0 === t ? void 0 : t.firstElementChild) ||
                            void 0 === n ||
                            !n.nodeName ||
                            'IFRAME' !== r.firstElementChild.nodeName
                        )
                            throw new Error('Failed to find or resize iframe for ' + o);
                        var i = r.firstElementChild,
                            s = e.data;
                        (i.style.visibility = 'visible'),
                            (i.width = s.width.toString()),
                            (i.height = s.height.toString()),
                            (i.allow = 'payment *');
                    }
                }
            });
        var h = function () {
            return document.getElementsByClassName('clover-ach-modal')[0];
        };
        t.onShowAchModal = function (e) {
            var t = e.hash,
                n = h();
            n && ((r = t), (n.style.display = 'block'));
        };
        var f = function () {
            var e = h();
            e && (e.style.display = 'none');
        };
        (t.renderAchModal = function () {
            if (!h()) {
                var e = document.createElement('div');
                (e.className = 'clover-ach-modal'), e.setAttribute('style', 'display: none');
                var t = document.createElement('button');
                (t.textContent = 'X'),
                    (t.type = 'button'),
                    (t.onclick = function () {
                        f();
                    });
                var n = document.createElement('div');
                n.className = 'clover-ach-modal-content';
                var o = document.createElement('div');
                o.setAttribute('style', 'background-color: white;'), (o.className = 'clover-ach-modal-container');
                var a = document.createElement('button');
                (a.className = 'clover-ach-modal-accept-button'),
                    (a.textContent = 'Authorize'),
                    (a.type = 'button'),
                    (a.onclick = function () {
                        f(),
                            (function (e) {
                                var t = document
                                    .getElementsByClassName('clover-ach-modal-content')[0]
                                    .getElementsByTagName('input')[0].value;
                                if (!t) throw Error('Cannot find agreementId value from agreement dom content');
                                u.onAchAgreement(e, t);
                            })(r);
                    }),
                    o.appendChild(t),
                    o.appendChild(n),
                    o.appendChild(a),
                    e.appendChild(o),
                    document.body.prepend(e);
            }
        }),
            (t.renderFooter = function (e, t) {
                if (!document.getElementsByClassName('clover-footer')[0]) {
                    var n = document.createElement('div');
                    if (
                        ((n.className = 'clover-footer'),
                        n.setAttribute(
                            'style',
                            'padding: 18px 24px; background-color: #F4F5F5; border-radius: 0 0 14px 14px; text-align: center',
                        ),
                        e)
                    ) {
                        var o = document.createElement('div');
                        (o.className = 'clover-secure-payments'),
                            (o.innerHTML =
                                '<img style="margin: -2px 8px;max-width: 12px;" src="' +
                                d.BASE_HOST +
                                '/assets/icons/lock.png"/>Secure Payments Powered by <b>Clover</b><img style="margin: -4px 8px;max-width: 20px;"src="' +
                                d.BASE_HOST +
                                '/assets/icons/clover-symbol.png"/>'),
                            o.setAttribute(
                                'style',
                                'color: #B1B6B8; font-family: Roboto; font-size: 14px; font-weight: bold; line-height: 16px;',
                            ),
                            n.appendChild(o);
                    }
                    if (t) {
                        var r = document.createElement('a'),
                            a = document.createTextNode('Privacy Policy');
                        (r.className = 'clover-privacy-link'),
                            r.appendChild(a),
                            (r.title = 'Privacy Policy'),
                            (r.href = 'https://www.clover.com/privacy-policy'),
                            r.setAttribute(
                                'style',
                                'font-family: Roboto; font-size: 14px; font-weight: bold; line-height: 16px;',
                            ),
                            n.appendChild(r);
                    }
                    n.hasChildNodes && document.body.appendChild(n);
                }
            });
    },
    function (e, t, n) {
        'use strict';
        var o;
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.determineEnv = function () {
                if (o) return o;
                try {
                    var e = document.getElementsByTagName('script'),
                        t = Array.from(e).filter(function (e) {
                            return e.src.indexOf('clover.com/sdk.js') > 0;
                        });
                    if (t.length > 0) {
                        var n = t[0].src;
                        o = new URL(n);
                    } else {
                        n = Array.from(e).filter(function (e) {
                            return e.src.indexOf('localhost') > 0;
                        })[0].src;
                        o = new URL(n);
                    }
                } catch (e) {
                    console.warn('Could not determine environment'),
                        (o = new URL('https://checkout.sandbox.clover.com'));
                }
                return o;
            }),
            (t.getAppleMerchantIdByEnv = function (e) {
                return {
                    stg: 'merchant.com.clover.stg1.web.applepay',
                    dev: 'merchant.com.clover.dev1.web.applepay',
                    sandbox: 'merchant.com.clover.sandbox.web.applepay',
                    prod: 'merchant.com.clover.prod.web.applepay',
                }[e];
            });
    },
    function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.randomString = function (e) {
                void 0 === e && (e = 10);
                for (var t = '0123456789abcdefghijklmnopqrstuvwxyz', n = '', o = e; o > 0; --o)
                    n += t[Math.floor(Math.random() * t.length)];
                return n;
            }),
            (t.bindEvent = function (e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent('on' + t, n);
            });
        var o = (function () {
            function e(e, t, n, o, r) {
                (this.parentOrigin = e),
                    (this.childrenOrigin = t),
                    (this.senderType = n),
                    (this.callStack = r),
                    o && (this.intermediateWindow = o),
                    (this.isParent = 'PARENT' === n);
            }
            return (
                (e.prototype.sendMessageToParent = function (e, t, n, o) {
                    if (this.isParent) throw new Error('Cannot send message from parent to itself.');
                    var r = this.createMessage(['PARENT'], e, t, n, o);
                    return this.sendMessage(r, this.parentOrigin, window.parent);
                }),
                (e.prototype.sendMessageToChild = function (e, t, n, o, r) {
                    if ((void 0 === r && (r = 'en'), !this.isParent)) throw new Error('Can only use this from parent.');
                    if (!this.intermediateWindow) throw new Error('Intermediate window is undefined.');
                    var a = this.createMessage(['INTERMEDIATE'], e, t, n, o, r);
                    return this.sendMessage(a, this.childrenOrigin, this.intermediateWindow);
                }),
                (e.prototype.sendMessageToChildren = function (e, t, n, o, r) {
                    if (this.isParent) throw new Error('Can only use this from child.');
                    var a = this.createMessage(e, t, n, o, r);
                    return this.sendMessage(a, this.childrenOrigin, window.parent.frames, !0);
                }),
                (e.prototype.sendMessage = function (e, t, n, o) {
                    if ((void 0 === o && (o = !1), o))
                        for (var r = 0; r < n.length; r++) n[r].postMessage(JSON.stringify(e), t);
                    else n.postMessage(JSON.stringify(e), t);
                    if (e.shouldDefer && this.callStack) {
                        var a = e.hash;
                        return this.callStack.defer(a);
                    }
                }),
                (e.prototype.createMessage = function (e, n, o, r, a, i) {
                    return (
                        void 0 === o && (o = t.randomString()),
                        void 0 === r && (r = {}),
                        void 0 === a && (a = !1),
                        void 0 === i && (i = 'en'),
                        {
                            functionToInvoke: n,
                            hash: o,
                            sender: this.senderType,
                            recipients: e,
                            data: r,
                            shouldDefer: a,
                            locale: i,
                        }
                    );
                }),
                e
            );
        })();
        t.MessageSender = o;
    },
    function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var o = new Map(),
            r = {
                size: function () {
                    return o.size;
                },
                get: function (e) {
                    return o.get(e);
                },
                delete: function (e) {
                    return o.delete(e);
                },
                defer: function (e) {
                    var t = {};
                    return (
                        (t.promise = new Promise(function (e) {
                            t.resolve = e;
                        })),
                        o.set(e, t),
                        t.promise
                    );
                },
            };
        Object.freeze(r), (t.default = r);
    },
    function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var o = n(0),
            r = n(2),
            a = n(1),
            i = (function () {
                function e(e, t, n, o, r) {
                    var a, i;
                    (this.mounted = !1),
                        t &&
                            (t.paymentReqData && ((this.paymentReqData = t.paymentReqData), delete t.paymentReqData),
                            t.applePaymentRequest &&
                                ((this.applePaymentRequest = t.applePaymentRequest), delete t.applePaymentRequest),
                            t.sessionIdentifier &&
                                ((this.sessionIdentifier = t.sessionIdentifier), delete t.sessionIdentifier),
                            null != (null === (a = t) || void 0 === a ? void 0 : a.showPhoneTypeDropDown) &&
                                'boolean' ==
                                    typeof (null === (i = t) || void 0 === i ? void 0 : i.showPhoneTypeDropDown) &&
                                ((this.showPhoneTypeDropDown = t.showPhoneTypeDropDown.toString()),
                                delete t.showPhoneTypeDropDown),
                            t.phoneNumberMask && ((this.phoneNumberMask = t.phoneNumberMask), delete t.phoneNumberMask),
                            (this.styles = t)),
                        (this.elementType = e),
                        (this.apiKey = n),
                        (this.merchantId = o),
                        (this.locale = null !== r && void 0 !== r ? r : 'en');
                }
                return (
                    (e.prototype.mount = function (e) {
                        var t = document.querySelector(e);
                        if (!t) throw new Error('Unable to find a dom element for selector ' + e);
                        this.mountNode(t);
                    }),
                    (e.prototype.mountNode = function (e) {
                        var t, n;
                        if (!this.mounted) {
                            if ('PAYMENT_REQUEST_BUTTON_APPLE_PAY' === this.elementType) {
                                var i = !1;
                                try {
                                    i =
                                        (null ===
                                            (n = null === (t = window) || void 0 === t ? void 0 : t.ApplePaySession) ||
                                        void 0 === n
                                            ? void 0
                                            : n.canMakePayments()) && window.ApplePaySession.supportsVersion(3);
                                } catch (e) {
                                    console.error('Apple Pay session is not supported');
                                }
                                if (!i) return;
                            }
                            var s = r.determineEnv();
                            (this.mountedIFrame = document.createElement('iframe')),
                                (this.mountedIFrame.style.border = '0'),
                                'ACH_ELEMENTS' !== this.elementType &&
                                    ((this.mountedIFrame.style.height = '100%'),
                                    (this.mountedIFrame.style.width = '100%')),
                                (this.mountedIFrame.title = this.elementType.split('_').join(' ')),
                                this.elementType.includes('PAYMENT_REQUEST_BUTTON') &&
                                    ((this.mountedIFrame.allowPaymentRequest = !0),
                                    (this.mountedIFrame.allow = 'payment')),
                                this.paymentReqData &&
                                    (this.paymentReqData.merchantHostname = window.location.hostname),
                                (this.mountedIFrame.src = o.buildUrl(
                                    s.origin,
                                    this.elementType,
                                    this.apiKey,
                                    this.merchantId,
                                    this.styles,
                                    this.paymentReqData,
                                    this.locale,
                                    this.applePaymentRequest,
                                    this.sessionIdentifier,
                                    window.location.origin,
                                    this.showPhoneTypeDropDown,
                                    this.phoneNumberMask,
                                )),
                                e.appendChild(this.mountedIFrame),
                                (this.mounted = !0);
                            var l = e.getAttribute('id');
                            l && a.registerElementIdMapping(this.elementType, l);
                        }
                    }),
                    (e.prototype.addEventListener = function (e, t) {
                        if ('string' != typeof e)
                            throw new Error(
                                'When adding an event listener, the first argument should be a string event name.',
                            );
                        if ('function' != typeof t)
                            throw new Error(
                                'When adding an event listener, the second argument should be a function callback.',
                            );
                        a.registerElementEventListener(this.elementType, e, t);
                    }),
                    (e.prototype.removeEventListener = function (e) {
                        if ('string' != typeof e)
                            throw new Error(
                                'When removing an event listener, the first argument should be a string event name.',
                            );
                        a.removeElementEventListener(this.elementType, e);
                    }),
                    e
                );
            })();
        t.CloverElement = i;
    },
    function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        n(2);
        var o = ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'],
            r = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
        (t.createPaymentRequest = function (e) {
            var t = [
                    {
                        supportedMethods: 'https://google.com/pay',
                        data: (function (e) {
                            var t, n, a;
                            return {
                                environment: (null === (t = e) || void 0 === t ? void 0 : t.testMode)
                                    ? 'TEST'
                                    : 'PRODUCTION',
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                merchantInfo: {
                                    merchantId: 'BCR2DN6TRO2OTLBT',
                                    merchantName:
                                        ((a = null === (n = e) || void 0 === n ? void 0 : n.merchantName),
                                        null !== a && void 0 !== a ? a : 'Clover merchant'),
                                    merchantOrigin: 'www.example.com',
                                },
                                allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: { allowedAuthMethods: r, allowedCardNetworks: o },
                                        tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                                gateway: 'clover',
                                                gatewayMerchantId: '12345678901234567890',
                                            },
                                        },
                                    },
                                ],
                            };
                        })(e),
                    },
                ],
                n = e.currency,
                a = e.total,
                i = a.label,
                s = a.amount,
                l = e.requestPayerEmail,
                c = e.requestPayerName,
                d = { total: { label: i, amount: { currency: n || 'usd', value: s } } },
                u = { requestPayerEmail: l || !0, requestPayerName: c || !0 },
                p = void 0;
            try {
                p = new PaymentRequest(t, d, u);
            } catch (e) {
                console.error(e);
            } finally {
                return p;
            }
        }),
            (t.createApplePaymentRequest = function (e, t, n) {
                if ((void 0 === t && (t = 'US'), void 0 === n && (n = 'USD'), !e || e <= 0))
                    throw new Error('Amount is required');
                return {
                    countryCode: t,
                    currencyCode: n,
                    merchantCapabilities: ['supports3DS'],
                    supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
                    total: { label: 'Amount to be charged', type: 'final', amount: (e / 100).toFixed(2) },
                    requiredShippingContactFields: ['email'],
                    requiredBillingContactFields: ['postalAddress', 'name'],
                };
            });
    },
    function (e, t, n) {
        'use strict';
        var o =
                (this && this.__extends) ||
                (function () {
                    var e = function (t, n) {
                        return (e =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (e, t) {
                                    e.__proto__ = t;
                                }) ||
                            function (e, t) {
                                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                            })(t, n);
                    };
                    return function (t, n) {
                        function o() {
                            this.constructor = t;
                        }
                        e(t, n), (t.prototype = null === n ? Object.create(n) : ((o.prototype = n.prototype), new o()));
                    };
                })(),
            r =
                (this && this.__importDefault) ||
                function (e) {
                    return e && e.__esModule ? e : { default: e };
                };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var a = n(5),
            i = n(0),
            s = r(n(4)),
            l = n(3),
            c = (function (e) {
                function t(t, n) {
                    var o = e.call(this, 'INTERMEDIATE') || this;
                    return (o.apiKey = t), (o.merchantId = n), o;
                }
                return (
                    o(t, e),
                    (t.prototype.mountAndInit = function (e) {
                        this.mountNode(e),
                            (this.messageSender = new l.MessageSender(
                                document.location.origin,
                                i.BASE_HOST,
                                'PARENT',
                                this.mountedIFrame.contentWindow,
                                s.default,
                            ));
                    }),
                    (t.prototype.onSubmit = function (e, t, n, o) {
                        if (
                            (void 0 === t && (t = !1),
                            void 0 === n && (n = 'en'),
                            void 0 === o && (o = {}),
                            !this.mountedIFrame)
                        )
                            throw new Error('MessageElement should be mounted.');
                        var r = l.randomString();
                        return 'CC_TOKEN' === e
                            ? this.messageSender.sendMessageToChild(
                                  'postTokenRequest',
                                  r,
                                  { isMultipayToken: t },
                                  !0,
                                  n,
                              )
                            : 'GIFT_CARD_TOKEN' === e
                              ? this.messageSender.sendMessageToChild('postGiftCardTokenRequest', r, {}, !0, n)
                              : 'ACH_TOKEN' === e
                                ? this.messageSender.sendMessageToChild(
                                      'initiateAchTokenRequest',
                                      r,
                                      { isMultipayToken: t, options: o },
                                      !0,
                                      n,
                                  )
                                : void 0;
                    }),
                    (t.prototype.onAchAgreement = function (e, t, n, o) {
                        if ((void 0 === n && (n = !1), void 0 === o && (o = 'en'), !this.mountedIFrame))
                            throw new Error('MessageElement should be mounted.');
                        return this.messageSender.sendMessageToChild(
                            'postAchTokenRequest',
                            e,
                            { isMultipayToken: n, agreementId: t },
                            !1,
                            o,
                        );
                    }),
                    (t.prototype.onRecaptchaExecute = function (e, t) {
                        this.messageSender.sendMessageToChild(
                            'proceedWithTokenization',
                            l.randomString(),
                            { hash: e, recaptchaTokenResponse: t },
                            void 0,
                        );
                    }),
                    (t.prototype.updateApplePaymentStatus = function (e) {
                        var t;
                        this.messageSender.sendMessageToChild(
                            'updateApplePaymentStatus',
                            l.randomString(),
                            {
                                isPaymentSuccessful:
                                    'success' === (null === (t = e) || void 0 === t ? void 0 : t.toLowerCase()),
                            },
                            void 0,
                        );
                    }),
                    (t.prototype.updateApplePaymentRequest = function (e) {
                        this.messageSender.sendMessageToChild(
                            'updateApplePaymentRequest',
                            l.randomString(),
                            { updatedApplePaymentRequest: e },
                            void 0,
                        );
                    }),
                    t
                );
            })(a.CloverElement);
        t.MessageElement = c;
    },
    function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var o = n(5),
            r = n(0),
            a = n(1),
            i = (function () {
                function e(e, t, n) {
                    (this.apiKey = e), (this.merchantId = t), (this.locale = n);
                }
                return (
                    (e.getInstance = function (t, n, o, r, i) {
                        return e.instance || ((e.instance = new e(t, n, i)), a.renderFooter(o, r)), e.instance;
                    }),
                    (e.prototype.create = function (e, t) {
                        if (!e) throw new Error('Enter a valid element such as ' + r.paymentElements.join(', '));
                        if (null != t && null == t.paymentReqData && 'PAYMENT_REQUEST_BUTTON' === e && this.apiKey)
                            throw new Error('PaymentRequest object is invalid, apiKey-' + this.apiKey);
                        if (!r.paymentElements.includes(e))
                            throw new Error('Enter a valid element such as ' + r.paymentElements.join(', '));
                        return new o.CloverElement(e, t, this.apiKey, this.merchantId, this.locale);
                    }),
                    e
                );
            })();
        t.Element = i;
    },
    function (e, t, n) {
        'use strict';
        var o =
            (this && this.__importDefault) ||
            function (e) {
                return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        var r = n(8),
            a = n(7),
            i = n(0),
            s = o(n(4)),
            l = n(3),
            c = n(6),
            d = n(1),
            u = (function () {
                function e(e, t) {
                    if (!e) throw new Error('Apikey is required');
                    (this.apikey = e), (this.options = t), this.bindMessageHelper();
                }
                return (
                    (e.prototype.bindMessageHelper = function () {
                        l.bindEvent(window, 'message', function (e) {
                            var t,
                                n,
                                o,
                                r = e.data,
                                a = e.origin;
                            if (a === i.BASE_HOST)
                                try {
                                    var l = JSON.parse(r),
                                        c = l.data,
                                        u = l.functionToInvoke,
                                        p = l.hash,
                                        m = l.shouldDefer;
                                    if (s.default.size() > 0 && !m) {
                                        var h = s.default.get(p);
                                        if (h) return s.default.delete(p), h.resolve(c);
                                    }
                                    if (
                                        [
                                            'resizeFrame',
                                            'onBlurEvent',
                                            'onChangeEvent',
                                            'onFocusEvent',
                                            'onTokenizedWallet',
                                            'onWalletWindowOpen',
                                            'onWalletWindowClose',
                                            'setupAchModal',
                                            'onAchAgreementFetch',
                                            'onShowAchModal',
                                            'renderRecaptchaContainer',
                                            'executeRecaptcha',
                                            'renderCaptchaFromIframe',
                                            'removeApplePayFromDom',
                                            'onAppleTokenReceived',
                                            'onInformMerchantOfSessionCancellation',
                                        ].includes(u)
                                    )
                                        if ('resizeFrame' === u) d.resizeFrame(l);
                                        else if ('onBlurEvent' === u) d.onBlurEvent(l);
                                        else if ('onFocusEvent' === u) d.onFocusEvent(l);
                                        else if ('onChangeEvent' === u) d.onChangeEvent(l);
                                        else if ('onTokenizedWallet' === u) d.onTokenizedWallet(l);
                                        else if ('onWalletWindowOpen' === u) d.onWalletWindowOpen(l);
                                        else if ('onWalletWindowClose' === u) d.onWalletWindowClose(l);
                                        else if ('setupAchModal' === u) d.setupAchModal();
                                        else if ('onAchAgreementFetch' === u) d.onAchAgreementFetch(l);
                                        else if ('onShowAchModal' === u) d.onShowAchModal(l);
                                        else if ('renderRecaptchaContainer' === u) d.renderRecaptchaContainer(a);
                                        else if ('executeRecaptcha' === u) d.executeRecaptcha(l);
                                        else if ('renderCaptchaFromIframe' === u) d.renderCaptchaFromIframe(l);
                                        else if ('removeApplePayFromDom' === u) {
                                            var f =
                                                null === (n = null === (t = l) || void 0 === t ? void 0 : t.data) ||
                                                void 0 === n
                                                    ? void 0
                                                    : n.iFrameTitle;
                                            if (f)
                                                null === (o = document.querySelector('iframe[title="' + f + '"')) ||
                                                    void 0 === o ||
                                                    o.remove();
                                        } else if ('onAppleTokenReceived' === u) {
                                            var v = l.data,
                                                y = v.applePayToken,
                                                E = v.emailAddress;
                                            window.dispatchEvent(
                                                new CustomEvent('paymentMethod', {
                                                    detail: {
                                                        tokenRecieved: y,
                                                        customerEmail: E,
                                                        status: 'apple_token_received',
                                                    },
                                                }),
                                            );
                                        } else
                                            'onInformMerchantOfSessionCancellation' === u &&
                                                window.dispatchEvent(
                                                    new CustomEvent('paymentMethodEnd', {
                                                        detail: {
                                                            eventMessage:
                                                                'Session is either closed or terminated, void the charge request, if charge was initiated',
                                                            status: 'session_cancelled',
                                                        },
                                                    }),
                                                );
                                } catch (e) {
                                    console.error(e);
                                }
                        });
                    }),
                    (e.prototype.elements = function () {
                        var e = this.options || {},
                            t = e.showSecurePayments,
                            n = void 0 === t || t,
                            o = e.showPrivacyPolicy,
                            s = void 0 === o || o,
                            l = e.merchantId,
                            c = void 0 === l ? void 0 : l,
                            u = e.locale,
                            p = void 0 === u ? 'en' : u;
                        d.initElemMaps();
                        var m = document.createElement('div');
                        return (
                            m.setAttribute(
                                'style',
                                'top: 0;position: fixed;height: 1px;width: 1px;pointer-events: none;opacity: 0;',
                            ),
                            document.body.appendChild(m),
                            (this.messageElement = new a.MessageElement(this.apikey, c)),
                            this.messageElement.mountAndInit(m),
                            d.initMessageElement(this.messageElement),
                            (this.locale = i.localeSupported.includes(p) ? p : 'en'),
                            r.Element.getInstance(this.apikey, c, n, s, this.locale)
                        );
                    }),
                    (e.prototype.createToken = function (e) {
                        if ((void 0 === e && (e = !1), this.messageElement))
                            return this.messageElement.onSubmit('CC_TOKEN', e, this.locale);
                    }),
                    (e.prototype.createAchToken = function (e, t) {
                        if ((void 0 === t && (t = !1), this.messageElement)) {
                            if (!e)
                                throw new Error(
                                    'Trying to create a ach token without specifying a positive amount as options',
                                );
                            var n = e.amount;
                            if (!n || n <= 0)
                                throw new Error(
                                    'Trying to create a ach token without specifying a positive amount as options',
                                );
                            return this.messageElement.onSubmit('ACH_TOKEN', t, this.locale, { amount: n });
                        }
                    }),
                    (e.prototype.createGiftCardToken = function (e) {
                        void 0 === e && (e = {});
                        if (this.messageElement)
                            return this.messageElement.onSubmit('GIFT_CARD_TOKEN', !1, this.locale, e);
                    }),
                    (e.prototype.paymentRequest = function (e) {
                        var t = c.createPaymentRequest(e);
                        if (t) return t;
                        throw new Error('Unable to load the Payment Request API');
                    }),
                    (e.prototype.createApplePaymentRequest = function (e) {
                        var t = e.amount,
                            n = e.countryCode,
                            o = e.currencyCode;
                        return c.createApplePaymentRequest(t, n, o);
                    }),
                    (e.prototype.updateApplePaymentStatus = function (e) {
                        this.messageElement.updateApplePaymentStatus(e);
                    }),
                    (e.prototype.updateApplePaymentRequest = function (e) {
                        var t = e.amount,
                            n = e.countryCode,
                            o = e.currencyCode,
                            r = c.createApplePaymentRequest(t, n, o);
                        this.messageElement.updateApplePaymentRequest(r);
                    }),
                    e
                );
            })();
        e.exports = u;
    },
]);
//# sourceMappingURL=sdk.js.map
