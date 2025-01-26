import Head from 'next/head';

export default function SocialMediaRedirectPage() {
  return (
    <>
      <Head>
        <script defer>
          {`
            (function() {
              var originalUrl = window.location.href;

              function isSocialMediaInAppBrowser() {
                var ua = navigator.userAgent.toLowerCase();
                var patterns = [
                  'fban','fbav','fbios','fb_iab','fb4a','fblc','fbop', // Facebook variants
                  'instagram',
                  'tiktok', 'bytedancewebview', // TikTok variants
                  'twitter', 'twitterandroid', // Twitter variants
                  'linkedinapp',
                  'snapchat',
                  'pinterest',
                  'reddit',
                  'messengerforios', 'orca-android', // Messenger variants
                  'whatsapp',
                  'youtube'
                ];
                return patterns.some(function(p) { return ua.indexOf(p) !== -1; });
              }

              function isIOS() {
                return /iphone|ipad|ipod/i.test(navigator.userAgent);
              }

              function getIOSVersion() {
                var match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
                if (match && match.length > 1) {
                  return parseInt(match[1], 10);
                }
                return null;
              }

              if (!isSocialMediaInAppBrowser()) {
                console.log("Not a social media in-app browser. No special redirection needed.");
                return;
              }

              console.log("Social media in-app browser detected. Attempting to open stable environment.");

              if (isIOS()) {
                var iosVersion = getIOSVersion() || 0;
                var iosScheme;
                // iOS 17+ allows x-safari-https:// scheme
                if (iosVersion >= 17) {
                  iosScheme = 'x-safari-' + originalUrl;
                } else {
                  iosScheme = 'com-apple-mobilesafari-tab:' + originalUrl;
                }
                console.log("Redirecting iOS user to Safari/default browser:", iosScheme);
                window.location.href = iosScheme;
                return;
              }

              // For Android: Use intent URL to open the native app if installed, else default browser
              var androidIntentUrl = 'intent://' + originalUrl.replace(/^https?:\/\//, '') +
                '#Intent;scheme=https;S.browser_fallback_url=' + encodeURIComponent(originalUrl) + ';end;';

              console.log("Redirecting Android user via intent URL:", androidIntentUrl);
              window.location.href = androidIntentUrl;
            })();
          `}
        </script>
      </Head>
      <main>
        <h1>Redirection en cours...</h1>
        <p>Si vous n'êtes pas redirigé automatiquement, veuillez <a href="/">cliquer ici</a>.</p>
      </main>
    </>
  );
}