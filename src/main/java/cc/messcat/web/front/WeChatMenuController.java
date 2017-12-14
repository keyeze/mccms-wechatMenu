package cc.messcat.web.front;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.Charset;

/**
 * @author Flandre#CtChan
 */
@RestController
@RequestMapping("wechatMenu")
public class WeChatMenuController {
    @RequestMapping("/getToken")
    @ResponseBody
    public Object getToken(HttpServletRequest request) throws IOException {
        String params = request.getQueryString();
        String result = Request.Get("https://api.weixin.qq.com/cgi-bin/token?" + params).execute().handleResponse(new ResponseHandler<String>() {
            @Override
            public String handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
                int code = response.getStatusLine().getStatusCode();
                System.out.println(code);
                if (code != 200) {
                    return "error:code=" + code;
                }
                return EntityUtils.toString(response.getEntity(), Charset.forName("utf-8"));
            }
        });
        return result;
    }

    @RequestMapping(path = "/getMenu", produces = "application/json;charset=utf-8")
    @ResponseBody
    public Object getMenu(HttpServletRequest request) throws IOException {
        String params = request.getQueryString();
        String result = Request.Get("https://api.weixin.qq.com/cgi-bin/menu/get?" + params).execute().handleResponse(new ResponseHandler<String>() {
            @Override
            public String handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
                int code = response.getStatusLine().getStatusCode();
                System.out.println(code);
                if (code != 200) {
                    return "error:code=" + code;
                }
                return EntityUtils.toString(response.getEntity(), Charset.forName("utf-8"));
            }
        });
        return result;
    }

    @RequestMapping("/createMenu")
    @ResponseBody
    public Object createMenu(String json, String access_token) throws IOException {
        String result = Request.Post("https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + access_token).body(new StringEntity(json, ContentType.APPLICATION_JSON)).execute().handleResponse(new ResponseHandler<String>() {
            @Override
            public String handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
                int code = response.getStatusLine().getStatusCode();
                System.out.println(code);
                if (code != 200) {
                    return "error:code=" + code;
                }
                return EntityUtils.toString(response.getEntity(), Charset.forName("utf-8"));
            }
        });
        return result;
    }
}
