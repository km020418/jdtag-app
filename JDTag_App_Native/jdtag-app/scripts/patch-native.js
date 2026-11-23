// 세로 화면 고정 등 네이티브 프로젝트 보정 (setup 때 자동 실행)
const fs=require('fs');
const am='android/app/src/main/AndroidManifest.xml';
if(fs.existsSync(am)){let s=fs.readFileSync(am,'utf8');if(!s.includes('screenOrientation'))s=s.replace('<activity','<activity\n            android:screenOrientation="portrait"');fs.writeFileSync(am,s);console.log('android: portrait')}
const pl='ios/App/App/Info.plist';
if(fs.existsSync(pl)){let s=fs.readFileSync(pl,'utf8');
  s=s.replace(/<key>UISupportedInterfaceOrientations<\/key>\s*<array>[\s\S]*?<\/array>/,'<key>UISupportedInterfaceOrientations</key>\n\t<array>\n\t\t<string>UIInterfaceOrientationPortrait</string>\n\t</array>');
  if(!s.includes('UIViewControllerBasedStatusBarAppearance'))s=s.replace('<dict>','<dict>\n\t<key>UIViewControllerBasedStatusBarAppearance</key>\n\t<true/>');
  fs.writeFileSync(pl,s);console.log('ios: portrait')}
