var CtChanMethod = {
    DEFAULT_OPTION: $("<option value=''>请选择</option>"),
    DEFAULT_ROOT_MENU_NUM: 3,
    DEFAULT_SUB_MENU_NUM: 5,
    DEFAULT_ROOT_MENU_NAME_LIMIT: 4,
    DEFAULT_SUB_MENU_NAME_LIMIT: 7,
    menuNameAddCountLimit: function (limitCount) {
    },
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
            //验证是否已拥有3个
            // var rootNum = $("div#show").find("[name='" + $(this).val() + "']").length;
            // if (rootNum >= CtChanMethod.DEFAULT_ROOT_MENU_NUM) {
            //     alert("菜单栏已满,无法继续添加..");
            //     return;
            // }
            $("div.menuWhere").hide();
            limitCount = CtChanMethod.DEFAULT_ROOT_MENU_NAME_LIMIT;
        }
        //为菜单名称添加限制
        CtChanMethod.menuNameAddCountLimit(limitCount);
        CtChanMethod.menuTypeShow($(this).val());
    },
    menuTypeShow: function (val) {
        if (val == "sub") {
            $(".rootShow").hide();
            $("#menuType").val("");
            $("#menuType").trigger('change');
        }
        else
            $(".rootShow").show();
    },
    menuWhereChange: function () {
        //验证是否已拥有5个

    },
    menuWhereClear: function () {
        $("#menuWhere").html("");
        $("#menuWhere").append(CtChanMethod.DEFAULT_OPTION.clone(true));
    },
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
    },
    //menuType change事件
    menuTypeChange: function () {
        $("div.ct-selected").hide();
        if ($(this).val() == "") {
            return;
        }
        $("div." + $(this).val()).show();


    },
    transformUrl: function () {
        var url = $("#url").val();
        $("#url").val(url);
    },
    validForm: function () {
        return $("form#valid").valid();
    },
    buildElement: function () {
        var base;
        switch ($("#menuType").val()) {
            case "view":
                base = $("<button><span></span></button>");

                break;
            case "parent":
                base = $("<button><span></span></button>");
                break;
            default:
                base = $("<div><span></span></div>");
        }
        //填充所有menuType所需要的值.
        $("." + $("#menuType").val() + " [id]").each(function () {
            var dataKey = console.log($(this).prop("id"));
            base.attr("data-" + dataKey, $(this).val());
        });
        base.attr("name", $("#menuLevel").val());
        base.attr("data-type", $("#menuType").val());
        base.children("span").html($("#menuName").val());
        base.children("span").on("click", CtChanMethod.intoEditDiv);
        return base;
    },
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
    },
    menuSave: function () {
        if (!CtChanMethod.validForm()) {
            return;
        }
        var base = CtChanMethod.buildElement();
        CtChanMethod.replace($(".ct-active"), base);
        CtChanMethod.resetEditDiv();
    },
    intoEditDiv: function () {
        $(".ct-active").removeClass("ct-active");
        $(this).closest("[name]").addClass("ct-active");
        CtChanMethod.resetEditDiv();
        var menuLevel = $(this).closest("[name]").attr("name");
        var menuName = $(this).closest("[name]").children("span").html();
        var menuType = $(this).closest("[name]").attr("data-type");
        var menuUrl = $(this).closest("[name]").attr("data-url");
        $("select#menuLevel").val(menuLevel);
        $("select#menuLevel").trigger('change');
        $("input#menuName").val(menuName);
        $("select#menuType").val(menuType);
        $("select#menuType").trigger('change');
        $("input#url").val(menuUrl);
        if (menuLevel == "sub") {
            var menuWhere = $(this).closest("div[name='root']").index("div[name='root']");
            $("select#menuWhere").val(menuWhere);
            $("select#menuWhere").trigger('change');
        }
    },
    resetEditDiv: function () {
        $("div#edit").remove();
        CtChanMethod.DEFAULT_EDIT_SHOW.clone().appendTo("form#valid");
        $("select#menuLevel").on("change", CtChanMethod.menuLevelChange);
        $("select#menuWhere").on("change", CtChanMethod.menuWhereChange);
        $("select#menuType").on("change", CtChanMethod.menuTypeChange);
        $("button#reset").on("click", CtChanMethod.resetEditDiv);
        $("button#transform").on("click", CtChanMethod.transformUrl());
    },
    resetShowDiv: function () {
        $("#show").html("");
    },
    loadMenu: function (data) {
        CtChanMethod.resetShowDiv();
        var array = data.menu.button;
        array.forEach(function (data) {
            var item;
            if (!data.type) {
                item = $("<div/>");
                item.html("<span>" + data.name + "</span>");
                data.sub_button.forEach(function (data) {
                    var it;
                    it = $("<button/>");
                    it.html("<span>" + data.name + "</span>");
                    it.attr("data-url", data.url);
                    it.attr("name", "sub");
                    it.attr("data-type", data.type ? data.type : "parent");
                    it.children("span").on("click", CtChanMethod.intoEditDiv);
                    it.appendTo(item);
                })
            } else if (data.type == "view") {
                item = $("<button/>");
                item.html("<span>" + data.name + "</span>");
                item.attr("data-url", data.url);
            }
            item.attr("name", "root");
            item.attr("data-type", data.type ? data.type : "parent");
            item.children("span").on("click", CtChanMethod.intoEditDiv);
            item.appendTo("div#show");
        }, array);

    },
    replace: function (oldItem, newItem) {
        newItem.insertAfter(oldItem);
        newItem.prev().remove();
    },
    getRange: function () {
        var result = $("#menuLevel").val() == "sub" ? CtChanMethod.DEFAULT_SUB_MENU_NAME_LIMIT : CtChanMethod.DEFAULT_ROOT_MENU_NAME_LIMIT;
        return [1, result];
    }
};
var CtChanWeChatMethod = {
    createWeChatMenu: function () {
        var json = {};
        var array = [];
        $("[name='root']").each(function () {
            var item = {};
            item.name = $(this).children("span").html();
            if ($(this).attr("data-type") == "parent") {
                var subButton = [];
                $(this).find("button").each(function () {
                    var it = {}
                    it.name = $(this).children("span").html();
                    it.type = $(this).attr("data-type");
                    it.url = $(this).attr("data-url");
                    subButton.push(it);
                })
                item.sub_button = subButton;
            } else {
                item.type = $(this).attr("data-type");
                item.url = $(this).attr("data-url");
            }
            array.push(item);
        });
        json.button = array;
        console.log(JSON.stringify(json));
        CtChanWeChatMethod.createMenu(JSON.stringify(json));

    },
    receiveWeChatMenu: function () {
        if (!CtChanWeChatMethod.accessToken) {
            alert("请先获取授权");
            return;
        }
        $.ajax({
            url: ctx + "/wechatMenu/getMenu",
            method: "GET",
            dataType: 'json',
            data: {
                access_token: CtChanWeChatMethod.accessToken
            }, success: function (data) {
                CtChanMethod.loadMenu(data);
            }
        });
        // CtChanMethod.loadMenu(tempJson);


    },
    authorize: function () {
        var appId = $("input#appId").val();
        var appSecret = $("input#appSecret").val();
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
                    CtChanWeChatMethod.accessToken = data.access_token;
                } else {
                    console.log(JSON.stringify(data));
                    alert(data.errcode + ":" + data.errmsg);
                }
            }
        })
    },
    createMenu: function (json) {
        var appId = $("input#appId").val();
        var appSecret = $("input#appSecret").val();
        $.ajax({
            url: ctx + "/wechatMenu/createMenu",
            data: {
                json: json,
                access_token: CtChanWeChatMethod.accessToken
            },
            dataType: 'json',
            method: "POST",
            success: function (data) {
                console.log(JSON.stringify(data));
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
        $("button#save").removeAttr("disabled");
        $("button#save").html("新增");
        $("button#save").unbind("click");
        $("button#save").on("click", CtChanMethod.menuAdd);
    });
    $("button#editor").on("click", function () {
        $("button#save").removeAttr("disabled");
        $("button#save").html("保存");
        $("button#save").unbind("click");
        $("button#save").on("click", CtChanMethod.menuSave);
    });
    $("button#delete").on("click", function () {
        if (confirm("再次确认删除")) {
            $(".ct-active").remove();
            CtChanMethod.resetEditDiv();
        }
    });
    $("#authorize").on("click", CtChanWeChatMethod.authorize);
    $("#push").on("click", CtChanWeChatMethod.createWeChatMenu);
    $("#get").on("click", CtChanWeChatMethod.receiveWeChatMenu);
    $("span").on("click", CtChanMethod.intoEditDiv);

    jQuery.validator.addMethod("limit", function (value, element, params) {
        if ($(element).val() == "root") {
            return $("[name='root']").length <= params;
        }
        if ($(element).val() == "sub") {
            var subNum = $("div[name='root']").eq($(element).val()).find("button").length;
            return subNum <= params;
        }
    }, "超出添加限制!!");
    jQuery.validator.addMethod("isRequired", function (value, element, params) {

        return $(params.element).val() != params.value || ($(params.element).val() == params.value && $(element).val() != "");
    }, "这是必填字段!!");
    $("form#valid").validate({
        onfocusout: false,
        onkeyup: false,
        focusInvalid: false,
        rules: {
            menuLevel: {
                required: true,
                limit: 3
            },
            menuWhere: {
                isRequired: {
                    element: "#menuLevel",
                    value: "sub"
                }
            },
            menuName: {
                required: true,
                rangelength: CtChanMethod.getRange,
            },
            url: {
                isRequired: {
                    element: "#menuType",
                    value: "view"
                },
                url: true
            }
        }
    });
});
