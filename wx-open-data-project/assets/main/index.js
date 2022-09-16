window.__require = function e(t, n, o) {
    function a(i, c) {
        if (!n[i]) {
            if (!t[i]) {
                var s = i.split("/");
                if (s = s[s.length - 1], !t[s]) {
                    var p = "function" == typeof __require && __require;
                    if (!c && p) return p(s, !0);
                    if (r) return r(s, !0);
                    throw new Error("Cannot find module '" + i + "'");
                }
                i = s;
            }
            var d = n[i] = {
                exports: {}
            };
            t[i][0].call(d.exports, function(e) {
                return a(t[i][1][e] || e);
            }, d, d.exports, e, t, n, o);
        }
        return n[i].exports;
    }
    for (var r = "function" == typeof __require && __require, i = 0; i < o.length; i++) {
        a(o[i]);
    }
    return a;
}({
    manager: [ function(e, t, n) {
        "use strict";
        cc._RF.push(t, "90bda3ruP9A17ANjTacJ/ig", "manager"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./moon-rank/moon-rank"), a = e("./subdomain-name"), r = e("./today-rank/today-rank"), i = cc._decorator, c = i.ccclass, s = i.property, p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.canvas = null, t.moonRank = null, t.todayRank = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                var e = this;
                console.log(" 子域进入 scene"), cc.sys.platform == cc.sys.WECHAT_GAME_SUB && wx && wx.onMessage(function(t) {
                    if (console.log("manager", "收到消息", t), t) {
                        var n = t.cmd, o = t.type, a = t.score, r = t.w, i = t.h, c = t.fromEngine;
                        if (t.setData, !c) {
                            var s = n.split("-");
                            if (console.log("cmd list::::", s, r, i), s.length > 1) {
                                if (e.moonRank.active = !1, e.todayRank.active = !1, "show" == s[0] && r && i) {
                                    var p = cc.size(r, i);
                                    e.canvas.designResolution = p, e.canvas.node.width = r, e.canvas.node.height = i, 
                                    e.canvas.node.setPosition(r / 2, i / 2);
                                } else "update" == s[0] ? e.updateRankScore(s[1], a, o) : "remove" == s[0] && e.removeRankScore(s[1]);
                            } else switch (n) {
                              case "resize":
                                e.resize(r, i);
                                break;

                              default:
                                cc.warn(">>> unknown cmd subcontext message <<<", t);
                            }
                        }
                    } else cc.warn("wx onMessage res is null");
                });
            }, t.prototype.resize = function(e, t) {
                this.canvas.designResolution = cc.size(e, t);
            }, t.prototype.updateRankScore = function(e, t, n) {
                var o = this;
                console.log(e, t, n), this.setCloudScore({
                    rankName: e,
                    score: t,
                    complete: function complete() {
                        o.updateRankData(e);
                    }
                });
            }, t.prototype.removeRankScore = function(e) {
                var t = this;
                this.setCloudScore({
                    rankName: e,
                    score: "",
                    complete: function complete() {
                        t.updateRankData(e);
                    }
                });
            }, t.prototype.setCloudScore = function(e) {
                var t = e.rankName, n = e.score, o = (e.success, e.fail, e.complete), a = JSON.parse(n);
                console.log(" ----- 设置云端分数 ----- ", a);
                var r = {
                    wxgame: {
                        score: a.moonCount,
                        update_time: Date.now() / 1e3
                    },
                    state: a.state
                };
                wx.setUserCloudStorage({
                    KVDataList: [ {
                        key: t,
                        value: JSON.stringify(r)
                    } ],
                    success: function success(e) {
                        console.log("setUserCloudStorage suc = ", e);
                    },
                    fail: function fail(e) {
                        console.log("setUserCloudStorage fail = ", e);
                    },
                    complete: o
                });
            }, t.prototype.updateRankData = function(e) {
                var t = this;
                setTimeout(function() {
                    e == a.ShownType.friendRank ? t.moonRank.getComponent(o.default).updateData() : e == a.ShownType.todayRank && t.todayRank.getComponent(r.default).updateData();
                }, 100);
            }, __decorate([ s({
                type: cc.Canvas,
                tooltip: "Canvas"
            }) ], t.prototype, "canvas", void 0), __decorate([ s({
                type: cc.Node,
                tooltip: "好有排行榜"
            }) ], t.prototype, "moonRank", void 0), __decorate([ s({
                type: cc.Node,
                tooltip: "进入朋友圈"
            }) ], t.prototype, "todayRank", void 0), __decorate([ c ], t);
        }(cc.Component);
        n.default = p, cc._RF.pop();
    }, {
        "./moon-rank/moon-rank": "moon-rank",
        "./subdomain-name": "subdomain-name",
        "./today-rank/today-rank": "today-rank"
    } ],
    "moon-rank": [ function(e, t, n) {
        "use strict";
        cc._RF.push(t, "ec80fZ9BaZEAZZpig+llbEF", "moon-rank"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./ranking-item"), a = cc._decorator, r = a.ccclass, i = a.property, c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.container = null, t.userRank = null, t.pre = null, t.scoreName = "friendRank", 
                t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.nickName = "", this.avatarUrl = "", this.score = 0, this.rankLength = 200;
            }, t.prototype.updateData = function() {
                var e = this;
                this.node.active = !0, this.openid ? this.getFriendData() : this.getUserInfo(function(t) {
                    if (t.data[0]) {
                        cc.log("res.data[0]", t.data[0]);
                        var n = t.data[0];
                        e.gender = n.gender || 0, e.openid = n.openId || 0, e.nickName = n.nickName || "", 
                        e.defaultAvatar = n.avatarUrl || "", e.getFriendData();
                    }
                });
            }, t.prototype.getUserInfo = function(e) {
                wx.getUserInfo({
                    openIdList: [ "selfOpenId" ],
                    success: function success(t) {
                        e && e(t);
                    },
                    fail: function fail() {},
                    complete: function complete() {}
                });
            }, t.prototype.getFriendData = function() {
                var e = this, t = this;
                wx.getFriendCloudStorage({
                    keyList: [ this.scoreName ],
                    success: function success(n) {
                        console.log("好友数据", n);
                        var a, r, _i, c = [];
                        a = n.data, r = function r(e, n) {
                            return t.getValue(e, t.scoreName).wxgame.score >= t.getValue(n, t.scoreName).wxgame.score;
                        }, (_i = function i(e, t, n) {
                            var o = t, a = n, c = e[t];
                            if (!(o >= a)) {
                                for (;o != a; ) {
                                    for (;o < a && r(c, e[a]); ) {
                                        a--;
                                    }
                                    for (o < a && (e[o] = e[a]); o < a && r(e[o], c); ) {
                                        o++;
                                    }
                                    o < a && (e[a] = e[o]);
                                }
                                e[o] = c, _i(e, t, o - 1), _i(e, o + 1, n);
                            }
                        })(a, 0, a.length - 1);
                        var s = [];
                        (c = a) && (c.forEach(function(n, o) {
                            var a = !1;
                            n.nickname == e.nickName && (a = !0);
                            var r = e.getValue(n, t.scoreName), i = {
                                index: o,
                                rank: o + 1,
                                id: r.uid,
                                avatar: n.avatarUrl || "",
                                nickName: n.nickname || "",
                                gender: r.gender || 0,
                                moonCount: r.wxgame.score || 0,
                                vip: r.vip || 0,
                                onLine: !1,
                                note: r.note || "",
                                isMe: a,
                                openid: n.openid
                            };
                            s.push(i), n.nickname == e.nickName && e.updateUserInfo(i);
                        }), console.log(JSON.stringify(s)), t.container.destroyAllChildren(), s.forEach(function(e) {
                            var n = cc.instantiate(t.pre);
                            n.getComponent(o.default).init(e), t.container.addChild(n);
                        }));
                    },
                    fail: function fail() {}
                });
            }, t.prototype.updateUserInfo = function(e) {
                this.userRank.updateItem({
                    index: 1,
                    rank: e.rank,
                    id: e.id,
                    avatar: e.avatar,
                    nickName: e.nickName,
                    moonCount: e.moonCount || 0,
                    isMe: !0
                }, !0);
            }, t.prototype.getValue = function(e, t) {
                var n = {
                    uid: 0,
                    gender: 0,
                    moonCount: 0,
                    vip: 0,
                    wxgame: {
                        score: 0,
                        update_time: 0
                    },
                    note: ""
                };
                if (!e.KVDataList || e.KVDataList.length <= 0) ; else for (var o in e.KVDataList) {
                    var a = e.KVDataList[o];
                    if (a && a.key == t) {
                        var r = JSON.parse(a.value);
                        if (!r) continue;
                        if (!r.wxgame) continue;
                        n = {
                            uid: r.uid || 0,
                            gender: r.gender || 0,
                            moonCount: r.wxgame.score || 0,
                            vip: r.vip || 0,
                            note: r.note || 0,
                            wxgame: {
                                score: r.wxgame.score || 0,
                                update_time: r.wxgame.update_time || 0
                            }
                        };
                        break;
                    }
                }
                return n;
            }, t.prototype.distinct = function(e, t) {
                for (var n = [], o = {}, a = 0, r = e.concat(t); a < r.length; a++) {
                    var i = r[a];
                    o[i] || (n.push(i), o[i] = 1);
                }
                return n;
            }, __decorate([ i({
                type: cc.Node,
                tooltip: "动态滚动列表"
            }) ], t.prototype, "container", void 0), __decorate([ i({
                type: o.default,
                tooltip: "用户自己的模版"
            }) ], t.prototype, "userRank", void 0), __decorate([ i({
                type: cc.Prefab,
                tooltip: "pre"
            }) ], t.prototype, "pre", void 0), __decorate([ r ], t);
        }(cc.Component);
        n.default = c, cc._RF.pop();
    }, {
        "./ranking-item": "ranking-item"
    } ],
    "ranking-item": [ function(e, t, n) {
        "use strict";
        cc._RF.push(t, "73413QDpzRI5agvDCsHexH+", "ranking-item"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = cc._decorator, a = o.ccclass, r = o.property, i = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.rankImage = null, t.contentImage = null, t.textImage = null, t.headerImage = null, 
                t.rankLabel = null, t.nameLabel = null, t.numLabel = null, t.whiteColor = new cc.Color().fromHEX("#FFFFFF"), 
                t.yellowColor = new cc.Color().fromHEX("#FBE14D"), t.blackColor = new cc.Color().fromHEX("#000000"), 
                t;
            }
            return __extends(t, e), t.prototype.updateItem = function(e, t) {
                void 0 === t && (t = !1), this.node.active = !0, this.init(e, t);
            }, t.prototype.init = function(e, t) {
                void 0 === t && (t = !1), e && (this.setRankImg(e.rank, e.isMe, t), this.setAvatar(this.headerImage, e.avatar), 
                this.rankLabel.string = e.rank + "", this.nameLabel.string = e.nickName || "", this.numLabel.string = "通关 " + e.moonCount + " 次");
            }, t.prototype.setRankImg = function(e, t, n) {
                void 0 === t && (t = !1), void 0 === n && (n = !1);
                var o = "rank/rank_header_blue.png", a = "rank/rank_item_white.png", r = this.blackColor;
                switch (e) {
                  case 1:
                    o = "rank/rank_header_yellow.png", a = "rank/rank_item_yellow.png", r = this.blackColor;
                    break;

                  case 2:
                    o = "rank/rank_header_silver.png";
                    break;

                  case 3:
                    o = "rank/rank_header_orange.png";
                }
                n && (r = this.whiteColor, o = "rank/rank_header_black.png", a = "rank/rank_item_black.png"), 
                this.rankLabel.node.color = r, this.nameLabel.node.color = r, this.changeSpriteFrame(this.rankImage, o), 
                this.changeSpriteFrame(this.contentImage, a);
            }, t.prototype.setAvatar = function(e, t) {
                if (e) {
                    var n = e.getComponent(cc.Sprite);
                    t && 0 != t.length ? cc.assetManager.loadRemote(t, {
                        ext: ".png"
                    }, function(e, t) {
                        t.packable = !1, n.spriteFrame = new cc.SpriteFrame(t);
                    }) : cc.loader.loadRes("rank/avatar.png", cc.SpriteFrame, function(e, t) {
                        e ? console.log("avatar err = " + e) : n.spriteFrame = t;
                    });
                } else console.log("setAvatar node 为空");
            }, t.prototype.changeSpriteFrame = function(e, t) {
                var n = e.getComponent(cc.Sprite);
                n.pp_url = t, cc.loader.loadRes(t, cc.SpriteFrame, function(e, o) {
                    e ? cc.error("SpriteFrame加载错误, 节点名: " + n.node.name + ", url: " + t) : n.pp_url === t && (n.spriteFrame = o);
                });
            }, __decorate([ r({
                type: cc.Node,
                tooltip: "排行背景"
            }) ], t.prototype, "rankImage", void 0), __decorate([ r({
                type: cc.Node,
                tooltip: "内容背景"
            }) ], t.prototype, "contentImage", void 0), __decorate([ r({
                type: cc.Node,
                tooltip: "文字背景"
            }) ], t.prototype, "textImage", void 0), __decorate([ r({
                type: cc.Node,
                tooltip: "头像"
            }) ], t.prototype, "headerImage", void 0), __decorate([ r({
                type: cc.Label,
                tooltip: "排行"
            }) ], t.prototype, "rankLabel", void 0), __decorate([ r({
                type: cc.Label,
                tooltip: "昵称"
            }) ], t.prototype, "nameLabel", void 0), __decorate([ r({
                type: cc.Label,
                tooltip: "通关次数"
            }) ], t.prototype, "numLabel", void 0), __decorate([ a ], t);
        }(cc.Component);
        n.default = i, cc._RF.pop();
    }, {} ],
    "subdomain-name": [ function(e, t, n) {
        "use strict";
        cc._RF.push(t, "81cd43kaqdL7K9WIUjSflWC", "subdomain-name"), Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.RefreshType = n.ShownType = void 0, function(e) {
            e.friendRank = "friendRank", e.todayRank = "todayRank";
        }(n.ShownType || (n.ShownType = {})), (n.RefreshType || (n.RefreshType = {})).add = "cover", 
        cc._RF.pop();
    }, {} ],
    "today-item": [ function(e, t, n) {
        "use strict";
        cc._RF.push(t, "aee3fyC9zNDjoV3e+yC6h1V", "today-item"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = cc._decorator, a = o.ccclass, r = o.property, i = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.headerImage = null, t.nameLabel = null, t;
            }
            return __extends(t, e), t.prototype.init = function(e) {
                e && (this.setAvatar(this.headerImage, e.avatar), this.nameLabel.string = e.nickName || "");
            }, t.prototype.setAvatar = function(e, t) {
                if (e) {
                    var n = e.getComponent(cc.Sprite);
                    t && 0 != t.length ? cc.assetManager.loadRemote(t, {
                        ext: ".png"
                    }, function(e, t) {
                        t.packable = !1, n.spriteFrame = new cc.SpriteFrame(t);
                    }) : cc.loader.loadRes("rank/avatar.png", cc.SpriteFrame, function(e, t) {
                        e ? console.log("avatar err = " + e) : n.spriteFrame = t;
                    });
                } else console.log("setAvatar node 为空");
            }, t.prototype.changeSpriteFrame = function(e, t) {
                var n = e.getComponent(cc.Sprite);
                n.pp_url = t, cc.loader.loadRes(t, cc.SpriteFrame, function(e, o) {
                    e ? cc.error("SpriteFrame加载错误, 节点名: " + n.node.name + ", url: " + t) : n.pp_url === t && (n.spriteFrame = o);
                });
            }, __decorate([ r({
                type: cc.Node,
                tooltip: "头像"
            }) ], t.prototype, "headerImage", void 0), __decorate([ r({
                type: cc.Label,
                tooltip: "昵称"
            }) ], t.prototype, "nameLabel", void 0), __decorate([ a ], t);
        }(cc.Component);
        n.default = i, cc._RF.pop();
    }, {} ],
    "today-rank": [ function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2579695IlVOzLut2bi0qt6r", "today-rank"), Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var o = e("./today-item"), a = cc._decorator, r = a.ccclass, i = a.property, c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.container = null, t.cardNode = null, t.sheepNode = null, t.scoreName = "todayRank", 
                t.angle = 0, t.radius = 0, t.zIndexList = null, t.containerX = 0, t.containerY = 0, 
                t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.nickName = "", this.avatarUrl = "", this.score = 0, this.rankLength = 200, 
                this.container.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
                    var t = e.touch.getDelta();
                    this.moveActionFunc(t);
                }, this), this.containerX = (this.container.width - 500) / 2, this.containerY = (this.container.height - 900) / 2;
            }, t.prototype.moveActionFunc = function(e) {
                this.container.x += e.x / 3, this.container.y += e.y / 3, this.container.x > this.containerX && (this.container.x = this.containerX), 
                this.container.x < -this.containerX && (this.container.x = -this.containerX), this.container.y > this.containerY && (this.container.y = this.containerY), 
                this.container.y < -this.containerY && (this.container.y = -this.containerY);
            }, t.prototype.updateData = function() {
                var e = this;
                this.node.active = !0, this.container.x = 0, this.container.y = 0, this.zIndexList = [ 29, 28, 27, 26, 28, 28, 30, 29, 28, 27, 26, 25, 18, 25, 24, 25, 26, 27, 40, 39, 38, 37, 36, 35, 34, 33, 22, 17, 16, 15, 22, 23, 24, 25, 26, 27 ], 
                wx && (this.openid ? this.getFriendData() : this.getUserInfo(function(t) {
                    if (t.data[0]) {
                        cc.log("res.data[0]", t.data[0]);
                        var n = t.data[0];
                        e.gender = n.gender || 0, e.openid = n.openId || 0, e.nickName = n.nickName || "", 
                        e.defaultAvatar = n.avatarUrl || "", e.getFriendData();
                    }
                }));
            }, t.prototype.getUserInfo = function(e) {
                wx.getUserInfo({
                    openIdList: [ "selfOpenId" ],
                    success: function success(t) {
                        e && e(t);
                    },
                    fail: function fail() {},
                    complete: function complete() {}
                });
            }, t.prototype.getFriendData = function() {
                var e = this, t = this;
                wx.getFriendCloudStorage({
                    keyList: [ this.scoreName ],
                    success: function success(n) {
                        console.log("好友数据", n);
                        var o, a, _r, i = [];
                        o = n.data, a = function a(e, n) {
                            return t.getValue(e, t.scoreName).wxgame.score >= t.getValue(n, t.scoreName).wxgame.score;
                        }, (_r = function r(e, t, n) {
                            var o = t, i = n, c = e[t];
                            if (!(o >= i)) {
                                for (;o != i; ) {
                                    for (;o < i && a(c, e[i]); ) {
                                        i--;
                                    }
                                    for (o < i && (e[o] = e[i]); o < i && a(e[o], c); ) {
                                        o++;
                                    }
                                    o < i && (e[i] = e[o]);
                                }
                                e[o] = c, _r(e, t, o - 1), _r(e, o + 1, n);
                            }
                        })(o, 0, o.length - 1);
                        var c = [];
                        (i = o) && (i.forEach(function(n, o) {
                            var a = !1;
                            n.nickname == e.nickName && (a = !0);
                            var r = e.getValue(n, t.scoreName), i = {
                                index: o,
                                rank: o + 1,
                                id: r.uid,
                                avatar: n.avatarUrl || "",
                                nickName: n.nickname || "",
                                gender: r.gender || 0,
                                moonCount: r.wxgame.score || 0,
                                vip: r.vip || 0,
                                onLine: !1,
                                note: r.note || "",
                                isMe: a,
                                openid: n.openid,
                                state: r.state
                            };
                            console.log("state = ", i.state, "moonCount = ", i.moonCount, "ts = ", r.wxgame.update_time);
                            var s = e.isToday(r.wxgame.update_time);
                            i.moonCount > 0 && s && c.push(i), n.nickname == e.nickName && e.updateUserInfo(i);
                        }), t.container.removeAllChildren(), e.angle = 240, e.radius = 200, c.forEach(function(e, n) {
                            t.setSheep(e, n);
                        }));
                    },
                    fail: function fail() {}
                });
            }, t.prototype.setSheep = function(e, t) {
                var n = cc.instantiate(this.cardNode);
                this.container.addChild(n), n.getComponent(o.default).init(e);
                var a = 0;
                t <= 6 ? (a = 6, this.radius = 200) : t <= 18 ? (a = 12, this.radius = 300) : (a = 18, 
                this.radius = 400);
                var r = this.angle / 180 * Math.PI, i = this.radius * Math.cos(r), c = this.radius * Math.sin(r);
                0 == t && (i = 0, c = 0), t < this.zIndexList.length && this.zIndexList[t], n.x = i, 
                n.y = c + 90, n.zIndex = 200;
                var s = cc.instantiate(this.sheepNode);
                if (this.container.addChild(s), s.x = i, s.y = c, s.setSiblingIndex(0), "win" == e.state) this.changeSpriteFrame(s, "rank/sheep_sheep.png"); else {
                    var p = "rank/Dead" + this.getDeadNum(e.moonCount) + ".png";
                    this.changeSpriteFrame(s, p);
                }
                this.angle += 360 / a, 0 == t && (this.angle = 240, this.radius = 200);
            }, t.prototype.getDeadNum = function(e) {
                var t = 1;
                return (t = e < 10 ? 1 : e < 20 ? 2 : e < 40 ? 3 : e < 60 ? 4 : e < 100 ? 5 : e < 140 ? 6 : e < 180 ? 7 : 8) > 8 && (t = 8), 
                t <= 0 && (t = 1), t;
            }, t.prototype.updateUserInfo = function() {}, t.prototype.getValue = function(e, t) {
                var n = {
                    uid: 0,
                    gender: 0,
                    moonCount: 0,
                    vip: 0,
                    wxgame: {
                        score: 0,
                        update_time: 0
                    },
                    note: "",
                    state: ""
                };
                if (!e.KVDataList || e.KVDataList.length <= 0) ; else for (var o in e.KVDataList) {
                    var a = e.KVDataList[o];
                    if (a && a.key == t) {
                        var r = JSON.parse(a.value);
                        if (!r) continue;
                        if (!r.wxgame) continue;
                        n = {
                            uid: r.uid || 0,
                            gender: r.gender || 0,
                            moonCount: r.wxgame.score || 0,
                            vip: r.vip || 0,
                            note: r.note || 0,
                            state: r.state || "",
                            wxgame: {
                                score: r.wxgame.score || 0,
                                update_time: r.wxgame.update_time || 0
                            }
                        };
                        break;
                    }
                }
                return n;
            }, t.prototype.distinct = function(e, t) {
                for (var n = [], o = {}, a = 0, r = e.concat(t); a < r.length; a++) {
                    var i = r[a];
                    o[i] || (n.push(i), o[i] = 1);
                }
                return n;
            }, t.prototype.changeSpriteFrame = function(e, t) {
                var n = e.getComponent(cc.Sprite);
                n.pp_url = t, cc.loader.loadRes(t, cc.SpriteFrame, function(e, o) {
                    e || n.pp_url === t && (n.spriteFrame = o);
                });
            }, t.prototype.isToday = function(e) {
                var t = this.formatTs(e), n = this.format("yyyy-mm-dd", new Date());
                return console.log(t, " # ", n, " # ", e), t == n;
            }, t.prototype.formatTs = function(e) {
                var t = new Date(1e3 * parseInt(e)), n = t.getFullYear(), o = t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1, a = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();
                return t.getHours(), t.getHours(), t.getMinutes(), t.getMinutes(), t.getSeconds(), 
                t.getSeconds(), n + "-" + o + "-" + a;
            }, t.prototype.format = function(e, t) {
                void 0 === e && (e = "yyyy-mm-dd");
                var n = t, o = {
                    "M+": n.getMonth() + 1,
                    "d+": n.getDate(),
                    "h+": n.getHours(),
                    "m+": n.getMinutes(),
                    "s+": n.getSeconds(),
                    "q+": Math.floor((n.getMonth() + 3) / 3),
                    S: n.getMilliseconds()
                };
                for (var a in /(y+)/i.test(e) && (e = e.replace(RegExp.$1, (n.getFullYear() + "").substr(4 - RegExp.$1.length))), 
                o) {
                    new RegExp("(" + a + ")", "i").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? o[a] : ("00" + o[a]).substr(("" + o[a]).length)));
                }
                return e;
            }, __decorate([ i({
                type: cc.Node,
                tooltip: "baseNode"
            }) ], t.prototype, "container", void 0), __decorate([ i({
                type: cc.Prefab,
                tooltip: "cardNode"
            }) ], t.prototype, "cardNode", void 0), __decorate([ i({
                type: cc.Prefab,
                tooltip: "sheepNode"
            }) ], t.prototype, "sheepNode", void 0), __decorate([ r ], t);
        }(cc.Component);
        n.default = c, cc._RF.pop();
    }, {
        "./today-item": "today-item"
    } ]
}, {}, [ "manager", "moon-rank", "ranking-item", "subdomain-name", "today-item", "today-rank" ]);