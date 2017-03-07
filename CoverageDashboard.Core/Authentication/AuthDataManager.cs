using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Web;

namespace CoverageDashboard.Core.Authentication
{
    public static class AuthDataManager
    {
        private static ConcurrentDictionary<Guid, Dictionary<string, Dictionary<string, string>>> authenticationData = new ConcurrentDictionary<Guid, Dictionary<string, Dictionary<string, string>>>();
        private static ConcurrentDictionary<Guid, string> redirectData = new ConcurrentDictionary<Guid, string>();

        public static bool IsFederatedAuthResponse(HttpRequest request)
        {
            if (string.Equals(request.RequestType, "POST", StringComparison.InvariantCultureIgnoreCase))
            {
                var keys = new HashSet<string>(request.Form.AllKeys, StringComparer.InvariantCultureIgnoreCase);

                if (keys.Contains("wa") && keys.Contains("wresult") && keys.Contains("wctx"))
                {
                    return true;
                }
            }


            //OAuth
            if (string.Equals(request.RequestType, "GET", StringComparison.InvariantCultureIgnoreCase))
            {
                var keys = new HashSet<string>(request.QueryString.AllKeys, StringComparer.InvariantCultureIgnoreCase);

                if (keys.Contains("code"))
                {
                    return true;
                }
            }

            return false;
        }

        public static void StoreAuthData(HttpRequest request, HttpResponse response)
        {
            if (!IsFederatedAuthResponse(request))
                throw new InvalidOperationException("Wrong request type");

            Dictionary<string, string> authFormDataMap = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase);
            foreach (var key in request.Unvalidated.Form.AllKeys)
            {
                authFormDataMap[key] = request.Unvalidated.Form[key];
            }

            Dictionary<string, string> authQueryDataMap = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase);
            foreach (var key in request.Unvalidated.QueryString.AllKeys)
            {
                authQueryDataMap[key] = request.Unvalidated.QueryString[key];
            }

            Dictionary<string, Dictionary<string, string>> authData = new Dictionary<string, Dictionary<string, string>>();
            authData["Form"] = authFormDataMap;
            authData["QueryString"] = authQueryDataMap;

            var id = Guid.NewGuid();
            authenticationData.AddOrUpdate(id, authData, (iid, old) => authData);
            response.Cookies.Set(new HttpCookie("auth-data-uid", id.ToString()));
        }

        public static bool HasAuthDataStored(HttpRequestBase request)
        {
            return (request.Cookies.Get("auth-data-uid") != null && !string.IsNullOrWhiteSpace(request.Cookies.Get("auth-data-uid").Value) && authenticationData.ContainsKey(new Guid(request.Cookies.Get("auth-data-uid").Value)));
        }

        public static Dictionary<string, Dictionary<string, string>> GetAuthData(HttpRequestBase request)
        {
            if (!HasAuthDataStored(request))
                throw new InvalidOperationException("Wrong request data");

            var uid = new Guid(request.Cookies.Get("auth-data-uid").Value);

            Dictionary<string, Dictionary<string, string>> result;
            authenticationData.TryGetValue(uid, out result);
            return result;
        }

        public static bool IsFederatedAuthRedirect(HttpResponse response)
        {
            return response.IsRequestBeingRedirected && response.RedirectLocation.IndexOf("adfs", StringComparison.InvariantCultureIgnoreCase) != -1 && response.RedirectLocation.IndexOf("signin", StringComparison.InvariantCultureIgnoreCase) != -1;
        }
        public static void StoreAuthRedirectData(HttpResponse response)
        {
            if (!IsFederatedAuthRedirect(response))
                throw new InvalidOperationException("Wrong response type");

            var id = Guid.NewGuid();
            redirectData.AddOrUpdate(id, response.RedirectLocation, (iid, old) => response.RedirectLocation);
            response.Cookies.Set(new HttpCookie("auth-redirect-data-uid", id.ToString()));
        }

        public static bool HasAuthRedirectDataStored(HttpRequestBase request)
        {
            return (request.Cookies.Get("auth-redirect-data-uid") != null && !string.IsNullOrWhiteSpace(request.Cookies.Get("auth-redirect-data-uid").Value) && redirectData.ContainsKey(new Guid(request.Cookies.Get("auth-redirect-data-uid").Value)));
        }
        public static string GetAuthRedirectData(HttpRequestBase request)
        {
            if (!HasAuthRedirectDataStored(request))
                throw new InvalidOperationException("Wrong request data");

            var uid = new Guid(request.Cookies.Get("auth-redirect-data-uid").Value);

            string result;
            redirectData.TryGetValue(uid, out result);
            return result;
        }

        public static void CleanupCookies(HttpResponseBase response)
        {
            response.Cookies.Set(new HttpCookie("auth-data-uid"));
            response.Cookies.Set(new HttpCookie("auth-redirect-data-uid"));
        }
    }
}