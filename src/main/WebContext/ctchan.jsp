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
        <label for="app_Id">appId:</label><input id="app_Id" value="wx7d1281dcff7acf45">
    </div>
    <div>
        <label for="app_Secret">appSecret:</label> <input id="app_Secret" value="05394dc86606d35823c2983531be4ee3">
    </div>
    <button id="authorize">获取授权</button>
</div>
<hr/>
<button id="create">创建</button>
<button id="editor">编辑</button>
<button id="copy">复刻</button>
<button id="delete">删除</button>
<hr/>
<div id="show">


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
                        <option value="root">一级菜单</option>
                        <option value="sub">二级菜单</option>
                    </select>
                </div>
                <div class="menuWhere">
                    <label for="menuWhere" class="sub">一级菜单:</label>
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
                        <option value="parent" class="rootShow">微信扩展菜单</option>

                        <option value="click">微信支持点击事件</option>
                        <option value="view">url链接菜单</option>
                        <option value="scancode_push">扫码推事件</option>
                        <option value="scancode_waitmsg">扫码带提示</option>
                        <option value="pic_sysphoto">系统拍照发图</option>
                        <option value="pic_photo_or_album">相册或拍照发图</option>
                        <option value="pic_weixin">微信相册发图</option>
                        <option value="location_select">选择并发送地址</option>
                        <option value="media_id">多媒体推送</option>
                        <option value="view_limited">图文推送</option>

                        <option value="miniprogram">小程序</option>
                    </select>
                </div>
                <br/>
                <!--view功能界面-->
                <div id="view" class="ct-selected view miniprogram">
                    <div>
                        <label for="url">跳转地址:</label>
                        <input id="url" name="url">
                        <button class="ct-transform" type="button">先跳转至微信登录</button>
                    </div>
                </div>

                <!--click功能界面-->
                <div class="ct-selected click pic_sysphoto scancode_waitmsg scancode_push pic_photo_or_album pic_weixin location_select">
                    <div>
                        <label for="key">key值:</label>
                        <input id="key" name="key">
                    </div>
                </div>

                <div class="ct-selected media_id view_limited">
                    <div>
                        <label for="media_id">media_id值:</label>
                        <input id="media_id" name="media_id">
                    </div>
                </div>

                <!--view功能界面-->
                <div class="ct-selected miniprogram">
                    <div>
                        <label for="appid">小程序appId:</label>
                        <input id="appid" name="appid">
                    </div>
                    <div>
                        <label for="pagepath">相对地址:</label>
                        <input id="pagepath" name="pagepath">
                    </div>
                </div>

            </div>
            <hr/>
            <div class="ct-doing">
                <button id="save" disabled>保存</button>
                <button id="reset" type="button">清空</button>
            </div>
        </div>
    </form>
</div>
<hr/>
<div>
    <button id="push"><span>生成微信菜单</span></button>
    <button id="get"><span>获取微信菜单</span></button>
</div>
<div id="hintShow">
    <div class="ct-hint menuLevel">
        <div class="title">菜单等级</div>
        <div class="content">
            <pre><code>
     自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。
     创建自定义菜单后，菜单的刷新策略是，在用户进入公众号会话页或公众号profile页时，如果发现上一次拉取菜单的请求在5分钟以前，就会拉取一下菜单，如果菜单有更新，就会刷新客户端的菜单。测试时可以尝试取消关注公众账号后再次关注，则可以看到创建后的效果。</p>
            </code></pre>
        </div>
    </div>
    <div class="ct-hint menuWhere">
        <div class="title">一级菜单</div>
        <div class="content">
            <pre><code> 选择二级菜单所属的一级菜单.</code></pre>
        </div>
    </div>
    <div class="ct-hint menuName">
        <div class="title">菜单名称</div>
        <div class="content">
            <pre><code>
    一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。
            </code></pre>
        </div>
    </div>
    <div class="ct-hint menuType">
        <div class="title">菜单类型</div>
        <div class="content">
<pre><code>
    1 、微信支持点击事件(click):点击推事件用户点击click类型按钮后，微信服务器会通过消息接口推送消息类型为event的结构给开发者（参考消息接口指南），并且带上按钮中开发者填写的key值，开发者可以通过自定义的key值与用户进行交互；
    2 、url链接菜单(view):跳转URL用户点击view类型按钮后，微信客户端将会打开开发者在按钮中填写的网页URL，可与网页授权获取用户基本信息接口结合，获得用户基本信息。
    3 、扫码推事件(scancode_push):扫码推事件用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者，开发者可以下发消息。
    4 、扫码带提示(scancode_waitmsg):扫码推事件且弹出“消息接收中”提示框用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后，将扫码的结果传给开发者，同时收起扫一扫工具，然后弹出“消息接收中”提示框，随后可能会收到开发者下发的消息。
    5 、系统拍照发图(pic_sysphoto):弹出系统拍照发图用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，同时收起系统相机，随后可能会收到开发者下发的消息。
    6 、相册或拍照发图(pic_photo_or_album):弹出拍照或者相册发图用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”。用户选择后即走其他两种流程。
    7 、微信相册发图(pic_weixin):弹出微信相册发图器用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器，并推送事件给开发者，同时收起相册，随后可能会收到开发者下发的消息。
    8 、选择并发送地址(location_select):弹出地理位置选择器用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器，同时收起位置选择工具，随后可能会收到开发者下发的消息。
    9 、多媒体推送(media_id):下发消息（除文本消息）用户点击media_id类型按钮后，微信服务器会将开发者填写的永久素材id对应的素材下发给用户，永久素材类型可以是图片、音频、视频、图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
    10、图文推送(view_limited):跳转图文消息URL用户点击view_limited类型按钮后，微信客户端将打开开发者在按钮中填写的永久素材id对应的图文消息URL，永久素材类型只支持图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
</code></pre>
            <p><strong>请注意，3到8的所有事件，仅支持微信iPhone5.4.1以上版本，和Android5.4以上版本的微信用户，旧版本微信用户点击后将没有回应，开发者也不能正常接收到事件推送。9和10，是专门给第三方平台旗下未微信认证（具体而言，是资质认证未通过）的订阅号准备的事件类型，它们是没有事件推送的，能力相对受限，其他类型的公众号不必使用。</strong>
            </p>
        </div>
    </div>
    <div class="ct-hint url">
        <div class="title">跳转地址</div>
        <div class="content">
            <pre><code>
    点击菜单后,会跳转的资源地址.
            </code></pre>
        </div>
    </div>
    <div class="ct-hint key">
        <div class="title">微信设置Key</div>
        <div class="content">
            <pre><code>
    微信消息接口的Key值
            </code></pre>
        </div>
    </div>
    <div class="ct-hint media_id">
        <div class="title">永久素材ID</div>
        <div class="content">
            <pre><code>
    上传的永久素材ID
            </code></pre>
        </div>
    </div>
    <div class="ct-hint appid">
        <div class="title">APP_ID</div>
        <div class="content">
            <pre><code>
    小程序的APP_ID
            </code></pre>
        </div>
    </div>
    <div class="ct-hint pagepath">
        <div class="title">页面相对路劲</div>
        <div class="content">
            <pre><code>
    小程序页面相对路径
            </code></pre>
        </div>
    </div>

</div>
</body>
</html>