// 처음 한 번: 안드로이드/iOS 프로젝트 생성 + 아이콘·스플래시 생성 + 보정 + 동기화
const {execSync}=require('child_process');const fs=require('fs');
const run=c=>{console.log('> '+c);execSync(c,{stdio:'inherit'})};
const only=process.argv[2]; // 'android' | 'ios' | undefined(둘 다)
if(only!=='ios'&&!fs.existsSync('android'))run('npx cap add android');
if(only!=='android'&&!fs.existsSync('ios'))run('npx cap add ios');
run(`npx capacitor-assets generate ${only?'--'+only:'--android --ios'} --iconBackgroundColor "#0064FF" --iconBackgroundColorDark "#0064FF" --splashBackgroundColor "#0E0F12" --splashBackgroundColorDark "#0E0F12"`);
run('node scripts/patch-native.js');
run('npx cap sync'+(only?' '+only:''));
