// 세로 화면 고정 등 네이티브 프로젝트 보정 (setup 때 자동 실행)
const fs=require('fs');
const am='android/app/src/main/AndroidManifest.xml';
if(fs.existsSync(am)){let s=fs.readFileSync(am,'utf8');if(!s.includes('screenOrientation'))s=s.replace('<activity','<activity\n            android:screenOrientation="portrait"');fs.writeFileSync(am,s);console.log('android: portrait')}
const pl='ios/App/App/Info.plist';
if(fs.existsSync(pl)){let s=fs.readFileSync(pl,'utf8');
  s=s.replace(/<key>UISupportedInterfaceOrientations<\/key>\s*<array>[\s\S]*?<\/array>/,'<key>UISupportedInterfaceOrientations</key>\n\t<array>\n\t\t<string>UIInterfaceOrientationPortrait</string>\n\t</array>');
  if(!s.includes('UIViewControllerBasedStatusBarAppearance'))s=s.replace('<dict>','<dict>\n\t<key>UIViewControllerBasedStatusBarAppearance</key>\n\t<true/>');
  fs.writeFileSync(pl,s);console.log('ios: portrait')}

// 시스템 글꼴 크기와 상관없이 디자인 비율 유지 (안드로이드 WebView textZoom 100%)
const path=require('path');
function findMain(d){if(!fs.existsSync(d))return null;for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory()){const r=findMain(p);if(r)return r}else if(f==='MainActivity.java')return p}return null}
const ma=findMain('android/app/src/main/java');
if(ma){let s=fs.readFileSync(ma,'utf8');if(!s.includes('setTextZoom')){s=s.replace(/public class MainActivity extends BridgeActivity\s*\{\s*\}/,`public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();
        try { getBridge().getWebView().getSettings().setTextZoom(100); } catch (Exception e) { }
    }
}`);fs.writeFileSync(ma,s);console.log('android: textZoom 100')}}
