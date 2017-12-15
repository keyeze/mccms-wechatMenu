var CtChanMethod = {
    DEFAULT_OPTION: $("<option value=''>请选择</option>"),
    DEFAULT_ROOT_MENU_NUM: 3,
    DEFAULT_SUB_MENU_NUM: 5,
    DEFAULT_ROOT_MENU_NAME_LIMIT: 4,
    DEFAULT_SUB_MENU_NAME_LIMIT: 7,
    menuNameAddCountLimit: function (limitCount) {
    }
    ,
//menuLevel change事件
    menuLevelChange: function () {
        if (!$(this).val()) {
            return;
        }
        var limitCount = 0;//菜单名称长度限制
        if ($(this).val() == "sub") {
            CtChanMethod.menuWhereLoad();
            $("div.menuWhere").show();
            limitCount = CtChanMethod.DEFAULT_SUB_MENU_NAME_LIMIT;
        } else {
            $("div.menuWhere").hide();
            limitCount = CtChanMethod.DEFAULT_ROOT_MENU_NAME_LIMIT;
        }
        //为菜单名称添加限制
        CtChanMethod.menuNameAddCountLimit(limitCount);
        CtChanMethod.menuTypeShow($(this).val());
    }
    ,
    menuTypeShow: function (val) {
        if (val == "sub") {
            $(".rootShow").hide();
            $("#menuType").val("");
            $("#menuType").trigger('change');
        }
        else
            $(".rootShow").show();
    }
    ,
    menuWhereChange: function () {
        //验证是否已拥有5个

    }
    ,
    menuWhereClear: function () {
        $("#menuWhere").html("");
        $("#menuWhere").append(CtChanMethod.DEFAULT_OPTION.clone(true));
    }
    ,
//加载根节点目录.
    menuWhereLoad: function () {
        //清除目录选项
        CtChanMethod.menuWhereClear();
        $("div[name='root']").each(function (i) {
            var option = CtChanMethod.DEFAULT_OPTION.clone(true);
            option.val(i);
            option.html($(this).find("span").html());
            option.appendTo("#menuWhere");
        });
    }
    ,
//menuType change事件
    menuTypeChange: function () {
        $("div.ct-selected").hide();
        if ($(this).val() == "") {
            return;
        }
        $("div.ct-selected." + $(this).val()).show();


    }
    ,
    transformUrl: function () {
        var url = CtChanWeChatMethod.DEFAULT_TRANSFORM_BASE_URL
            + "&appid=" + CtChanWeChatMethod.APP_ID
            + "&redirect_uri=" + encodeURIComponent($("#url").val());
        CtChanMethod.MyHint("transform:" + url);
        $("#url").val(url);
    }
    ,
    validForm: function () {
        return $("form#valid").valid();
    }
    ,
    buildElement: function () {
        var base;
        switch ($("#menuType").val()) {

            case "parent":
                base = $("<div><span></span></div>");
                break;
            case "view":
            case "click":
            default:
                base = $("<button><span></span></button>")

        }
        //填充所有menuType所需要的值.
        $("." + $("#menuType").val() + " [id]").each(function () {
            var dataKey = $(this).prop("id")
            CtChanMethod.MyHint(dataKey);
            base.attr("data-" + dataKey, $(this).val());
        });
        base.attr("name", $("#menuLevel").val());
        base.attr("data-type", $("#menuType").val());
        base.attr("data-name", $("#menuName").val());
        base.children("span").html($("#menuName").val());
        base.children("span").on("click", CtChanMethod.intoEditDiv);
        return base;
    }
    ,
    menuAdd: function () {
        if (!CtChanMethod.validForm()) {
            return;
        }
        var base = CtChanMethod.buildElement();

        if ($("#menuLevel").val() == "sub") {
            base.appendTo($("div[name='root']").eq($("#menuWhere").val()));
        } else {
            base.appendTo("div#show");
        }

        CtChanMethod.resetEditDiv();
    }
    ,
    menuSave: function () {
        if (!CtChanMethod.validForm()) {
            return;
        }
        var base = CtChanMethod.buildElement();
        CtChanMethod.replace($(".ct-active"), base);
        CtChanMethod.resetEditDiv();
    }
    ,
    intoEditDiv: function () {
        CtChanMethod.resetEditDiv();
        var menuLevel = $(this).closest("[name]").attr("name");
        var menuName = $(this).closest("[name]").attr("data-name");
        var menuType = $(this).closest("[name]").attr("data-type");
        var attrNames = $(this).closest("[name]")[0].getAttributeNames();

        for (var i in attrNames) {
            var item = attrNames[i];
            if (!/^data-[a-zA-Z][a-zA-Z0-9]+/.test(item)) {
                continue;
            }
            $("." + menuType + " #" + item.substring(5)).val($(this).closest("[name]").attr(item));
        }


        $(".ct-active").removeClass("ct-active");
        $(this).closest("[name]").addClass("ct-active");
        $("select#menuLevel").val(menuLevel);
        $("select#menuLevel").trigger('change');
        $("input#menuName").val(menuName);
        $("select#menuType").val(menuType);
        $("select#menuType").trigger('change');

        if (menuLevel == "sub") {
            var menuWhere = $(this).closest("div[name='root']").index("div[name='root']");
            $("select#menuWhere").val(menuWhere);
            $("select#menuWhere").trigger('change');
        }
    }
    ,
    resetEditDiv: function () {
        $("div#edit").remove();
        CtChanMethod.DEFAULT_EDIT_SHOW.clone().appendTo("form#valid");
        CtChanMethod.showHint();
        $("select#menuLevel").on("change", CtChanMethod.menuLevelChange);
        $("select#menuWhere").on("change", CtChanMethod.menuWhereChange);
        $("select#menuType").on("change", CtChanMethod.menuTypeChange);
        $("button#reset").on("click", CtChanMethod.resetEditDiv);
        $("button.ct-transform").on("click", CtChanMethod.transformUrl);
    }
    ,
    resetShowDiv: function () {
        $("#show").html("");
    }
    ,
    loadMenu: function (data) {
        CtChanMethod.resetShowDiv();
        var array = data.menu.button;
        array.forEach(function (data) {
            var item;
            if (!data.type) {
                item = $("<div/>");
                item.html("<span>" + data.name + "</span>");
                for (var attrName in data) {
                    if (attrName == 'sub_button') {
                        continue;
                    }
                    item.attr("data-" + attrName, data[attrName]);
                }
                data.sub_button.forEach(function (data) {
                    var it;
                    it = $("<button/>");
                    it.html("<span>" + data.name + "</span>");
                    it.attr("name", "sub");
                    for (var attrName in data) {
                        if (attrName == 'sub_button') {
                            continue;
                        }
                        it.attr("data-" + attrName, data[attrName]);
                    }
                    it.children("span").on("click", CtChanMethod.intoEditDiv);
                    it.appendTo(item);
                })
            } else {
                item = $("<button/>");
                item.html("<span>" + data.name + "</span>");
                for (var attrName in data) {
                    if (attrName == 'sub_button') {
                        continue;
                    }
                    item.attr("data-" + attrName, data[attrName]);
                }
            }
            item.attr("name", "root");
            item.attr("data-type", data.type ? data.type : "parent");
            item.children("span").on("click", CtChanMethod.intoEditDiv);
            item.appendTo("div#show");
        }, array);

    }
    ,
    replace: function (oldItem, newItem) {
        newItem.insertAfter(oldItem);
        newItem.prev().remove();
    }
    ,
    getRange: function () {
        var result = $("#menuLevel").val() == "sub" ? CtChanMethod.DEFAULT_SUB_MENU_NAME_LIMIT : CtChanMethod.DEFAULT_ROOT_MENU_NAME_LIMIT;
        return [1, result];
    },
    MyAlert: function (say) {
        alert(say);
    },
    MyHint: function (info) {
        console.log(info);
    },
    showHint: function () {
        $("#value [id]").on("focus", function () {
            $(".ct-hint").hide();
            $(".ct-hint." + $(this).attr("id")).show();
        })
    }
};
var CtChanWeChatMethod = {
    DEFAULT_TRANSFORM_BASE_URL: "https://open.weixin.qq.com/connect/oauth2/authorize?response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect",
    createWeChatMenu: function () {
        var json = {};
        var array = [];
        $("div#show [name='root']").each(function () {
            var item = {};
            var attrNames = this.getAttributeNames();
            for (var i in attrNames) {
                var attrName = attrNames[i];
                if (!/^data-[a-zA-Z][a-zA-Z0-9]+/.test(attrName)) {
                    continue;
                }
                if (attrName == "data-type" && $(this).attr(attrName) == "parent") {
                    continue;
                }
                item[attrName.substring(5)] = $(this).attr(attrName);
            }
            item.sub_button = [];
            $(this).find("[name='sub']").each(function () {
                var it = {}
                var attrNames = this.getAttributeNames();
                for (var i in attrNames) {
                    var attrName = attrNames[i];
                    if (!/^data-[a-zA-Z][a-zA-Z0-9]+/.test(attrName)) {
                        continue;
                    }
                    it[attrName.substring(5)] = $(this).attr(attrName);
                }
                item.sub_button.push(it);
            })

            array.push(item);
        });
        json.button = array;
        CtChanMethod.MyHint(JSON.stringify(json));
        CtChanWeChatMethod.createMenu(JSON.stringify(json));

    },
    receiveWeChatMenu: function () {
        if (!CtChanWeChatMethod.accessToken) {
            CtChanMethod.MyAlert("请先获取授权");
            return;
        }
        $.ajax({
            url: ctx + "/wechatMenu/getMenu",
            method: "GET",
            dataType: 'json',
            data: {
                access_token: CtChanWeChatMethod.accessToken
            }, success: function (data) {
                CtChanMethod.MyAlert("读取菜单成功");
                CtChanMethod.loadMenu(data);
            }
        });
    },
    authorize: function () {
        var appId = $("input#app_Id").val();
        var appSecret = $("input#app_Secret").val();
        $.ajax({
            url: ctx + "/wechatMenu/getToken",
            data: {
                grant_type: "client_credential",
                appid: appId,
                secret: appSecret
            },
            dataType: 'json',
            method: "GET",
            success: function (data) {
                if (data.access_token) {
                    CtChanWeChatMethod.APP_ID = appId;
                    CtChanWeChatMethod.APP_SECRET = appSecret;
                    CtChanWeChatMethod.accessToken = data.access_token;
                    CtChanMethod.MyAlert("获取授权成功");
                } else {
                    CtChanMethod.MyHint(JSON.stringify(data));
                    CtChanMethod.MyAlert(data.errcode + ":" + data.errmsg);
                }
            }
        })
    },
    createMenu: function (json) {
        $.ajax({
            url: ctx + "/wechatMenu/createMenu",
            data: {
                json: json,
                access_token: CtChanWeChatMethod.accessToken
            },
            dataType: 'json',
            method: "POST",
            success: function (data) {
                CtChanMethod.MyHint(JSON.stringify(data));
            }
        })
    }
};

$(function () {
    CtChanMethod.DEFAULT_EDIT_SHOW = $("div#edit").clone();
    CtChanMethod.DEFAULT_MENU_TYPE_SHOW = $("select#menuType").clone();
    CtChanMethod.resetEditDiv();

    // $("button#save").on("click", CtChanMethod.menuSave);
    $("button#create").on("click", function () {
        CtChanMethod.resetEditDiv();
        $(".ct-active").removeClass("ct-active");
        $("button#save").removeAttr("disabled");
        $("button#save").html("新增");
        $("button#save").unbind("click");
        $("button#save").on("click", CtChanMethod.menuAdd);

    });
    $("button#copy").on("click", function () {
        if ($(".ct-active").length == 0) {
            CtChanMethod.MyAlert("请先选中一个复刻对象");
            return;
        }
        $("button#save").removeAttr("disabled");
        $("button#save").html("新增");
        $("button#save").unbind("click");
        $("button#save").on("click", CtChanMethod.menuAdd);
    });

    $("button#editor").on("click", function () {
        if ($(".ct-active").length == 0) {
            CtChanMethod.MyAlert("请先选中一个编辑对象");
            return;
        }
        $("button#save").removeAttr("disabled");
        $("button#save").html("保存");
        $("button#save").unbind("click");
        $("button#save").on("click", CtChanMethod.menuSave);
    });
    $("button#delete").on("click", function () {
        if ($(".ct-active").length == 0) {
            CtChanMethod.MyAlert("请先选中一个删除对象");
            return;
        }
        if (confirm("再次确认删除")) {
            $(".ct-active").remove();
            CtChanMethod.resetEditDiv();
        }
    });
    $("#authorize").on("click", CtChanWeChatMethod.authorize);
    $("#push").on("click", CtChanWeChatMethod.createWeChatMenu);
    $("#get").on("click", CtChanWeChatMethod.receiveWeChatMenu);
    $("div#show span").on("click", CtChanMethod.intoEditDiv);

    jQuery.validator.addMethod("limit", function (value, element, params) {
        if ($("#save").html() != "新增") {
            return true;
        }
        var menuLevel = $("#menuLevel").val();
        if (menuLevel == "root") {
            return $("[name='root']").length < CtChanMethod.DEFAULT_ROOT_MENU_NUM;
        }
        if (menuLevel == "sub") {
            var menuWhere = $("#menuWhere").val();
            var subNum = $("div[name='root']").eq(menuWhere).find("button").length;
            return subNum < CtChanMethod.DEFAULT_SUB_MENU_NUM;
        }
    }, "超出添加限制!!");
    jQuery.validator.addMethod("isRequired", function (value, element, params) {
        return $(params.element).val() != params.value || ($(params.element).val() == params.value && $(element).val() != "");
    }, "这是必填字段!!");
    jQuery.validator.addMethod("selectRequired", function (value, element, params) {
        return !$(element).closest(".ct-selected").hasClass($("#menuType").val()) || $(element).val() != "";
    }, "这是必填字段!!");
    $("form#valid").validate({
        onfocusout: false,
        onkeyup: false,
        focusInvalid: false,
        rules: {
            menuLevel: {
                required: true,
                limit: true
            },
            menuWhere: {
                isRequired: {
                    element: "#menuLevel",
                    value: "sub"
                },
            },
            menuName: {
                required: true,
                rangelength: CtChanMethod.getRange
            },
            url: {
                selectRequired: true,
                url: true
            },
            key: {
                selectRequired: true
            },
            media_id: {
                selectRequired: true
            },
            app_id: {
                selectRequired: true
            },
            pagepath: {
                selectRequired: true
            }
        }
    });
});
