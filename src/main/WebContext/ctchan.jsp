<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        var ctx = "<%=request.getContextPath()%>"
    </script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/ctchan.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/messages_zh.min.js"></script>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/ctchan.css">
</head>
<body>
<div>
    <div>
        <label for="appId">appId:</label><input id="appId" value="wx7d1281dcff7acf45">
    </div>
    <div>
        <label for="appSecret">appSecret:</label> <input id="appSecret" value="05394dc86606d35823c2983531be4ee3">
    </div>
    <button id="authorize">获取授权</button>
</div>
<hr/>
<button id="create">创建</button>
<button id="editor">编辑</button>
<button id="copy">复制</button>
<button id="delete">删除</button>
<hr/>
<div id="show">

    <!--<button data-url="http://localhost:8081/html.html" name="root" data-type="view"><span>首页</span></button>-->
    <!--<div name="root" data-type="parent"><span>商城</span>-->
    <!--<button name="sub" data-type="view" data-url="http://localhost:8081/login"><span>门票中心</span></button>-->
    <!--<button name="sub" data-type="view" data-url="http://localhost:8081/login"><span>网络商城</span></button>-->
    <!--</div>-->
    <!--<div name="root" data-type="parent"><span>个人中心</span>-->
    <!--<button name="sub" data-type="view" data-url="http://localhost:8081/login"><span>密码修改</span></button>-->
    <!--<button name="sub" data-type="view" data-url="http://localhost:8081/login"><span>个人中心</span></button>-->
    <!--<button name="sub" data-type="view" data-url="http://localhost:8081/login"><span>地址管理</span></button>-->
    <!--</div>-->

</div>
<hr/>
<div id="editBook">
    <form onsubmit="false" id="valid">
        <div id="edit">
            <div id="value">
                <div>
                    <label for="menuLevel">菜单等级:</label>
                    <select id="menuLevel" name="menuLevel">
                        <option value="">请选择</option>
                        <option value="root">根菜单</option>
                        <option value="sub">子菜单</option>
                    </select>
                </div>
                <div class="menuWhere">
                    <label for="menuWhere" class="sub">父级菜单:</label>
                    <select id="menuWhere" name="menuWhere">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div>
                    <label for="menuName">菜单名称:</label>
                    <input id="menuName" name="menuName">
                </div>
                <div>
                    <label for="menuType">菜单类型:</label>
                    <select id="menuType" name="menuType">
                        <option value="" selected>请选择</option>
                        <option value="view">url链接菜单</option>
                        <option value="parent" class="rootShow">微信扩展菜单</option>
                        <option value="click">微信支持点击事件</option>
                        <option value="scancode_push">扫码推事件</option>
                        <option value="scandoe_waitmsg">扫码推事件且发送结果</option>
                        <option value="pic_sysphoto">上传图片</option>
                        <option value="pic_photo_or_album">上传..还不知道干嘛</option>
                        <option value="location_select">选择并发送地址</option>
                        <option value="media_id">下发永久素材</option>
                        <option value="view_limited">下发永久素材+URL</option>
                    </select>
                </div>
                <br/>
                <!--view功能界面-->
                <div id="view" class="ct-selected view">
                    <div>
                        <label for="url">跳转地址:</label>
                        <input id="url" name="url">
                        <button id="transform">先跳转至微信登录</button>
                    </div>
                </div>

                <!--click功能界面-->
                <div class="ct-selected click">
                    <div>
                        <label for="key">key值:</label>
                        <input id="key" name="key">
                    </div>
                </div>
            </div>
            <hr/>
            <button id="save" disabled>保存</button>
            <button id="reset">清空</button>
        </div>
    </form>
</div>
<hr/>
<div>
    <button id="push"><span>生成微信菜单</span></button>
    <button id="get"><span>获取微信菜单</span></button>
</div>
</body>
</html>