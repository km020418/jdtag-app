# JD Tag 앱 (iOS · Android 설치형)

웹으로 만든 JD Tag를 **진짜 설치형 앱**으로 감싼 프로젝트예요 (Capacitor).
서버는 지금 쓰는 Firebase(`jdtag-b0efc`)를 그대로 써서, 웹앱 사용자와 계정·명함·예약이 모두 연결돼요.

## 설치형 앱에서 달라지는 점

| | 웹앱(PWA) | 설치형 앱 |
|---|---|---|
| 아이콘 · 시작 화면 | 홈 화면 바로가기 | 진짜 앱 아이콘 + 네이티브 시작 화면 |
| 진동 | 안드로이드만 | **아이폰 포함** (탭 · 성공 · 실패 · 명함 수신 진동) |
| 상단 상태바 | 고정 | 화면 색에 맞춰 자동 변경 |
| 안드로이드 뒤로가기 버튼 | 브라우저 동작 | 앱 화면 뒤로가기 |
| 화면 방향 | 회전됨 | 세로 고정 |
| 배포 | 링크 공유 | APK 설치 / 앱스토어 · 플레이스토어 |

---

## A. 안드로이드 APK 받기 — 프로그램 설치 없이 (GitHub 이용, 약 10분)

1. https://github.com 가입 · 로그인
2. 오른쪽 위 **+ → New repository** → 이름 `jdtag-app`, **Private** 선택 → **Create repository**
3. 화면의 **uploading an existing file** 링크 클릭
4. 압축을 푼 `jdtag-app` 폴더 **안의 파일과 폴더 전부**를 끌어다 놓기
   - `.github` 폴더도 꼭 포함해야 해요 (맥에서는 `Cmd + Shift + .`으로 숨김 폴더 보이기)
5. 아래 **Commit changes** 클릭
6. 위쪽 **Actions** 탭 → `Android APK`가 자동으로 돌아가요 (5~8분, 초록 체크 ✓가 되면 완료)
7. 완료된 항목을 눌러 맨 아래 **Artifacts → JDTag-android-apk** 다운로드 → 압축 안의 `app-debug.apk`
8. APK를 안드로이드 폰으로 보내(카톡 · 메일 · USB) 열면 설치돼요
   - "출처를 알 수 없는 앱" 경고가 나오면 **설정에서 허용**을 눌러요

> 코드를 바꿔 다시 올리면 Actions가 새 APK를 자동으로 만들어요.

## B. 안드로이드 — 내 PC에서 직접 (Android Studio)

1. Node.js(22 이상) · Android Studio 설치
2. 이 폴더에서 터미널:
   ```
   npm install
   npm run setup -- android
   npm run android
   ```
3. Android Studio가 열리면 폰을 USB로 연결(개발자 옵션 → USB 디버깅) → ▶ Run

## C. 아이폰 (Mac + Xcode 필요)

1. Mac에 Node.js · Xcode 설치
2. 이 폴더에서 터미널:
   ```
   npm install
   npm run setup -- ios
   npm run ios
   ```
3. Xcode → App 타깃 → **Signing & Capabilities** → Team에 내 Apple ID 선택
4. 아이폰을 연결하고 ▶ Run (아이폰 설정 → 일반 → VPN 및 기기 관리에서 개발자 신뢰)
   - 무료 Apple ID: 내 폰에 7일간 설치 가능
   - 팀 배포 · 앱스토어: Apple 개발자 프로그램(연 $99) → TestFlight로 배포

## 스토어 출시 (나중에)

- **플레이스토어**: Android Studio → Build → Generate Signed Bundle(AAB) → Google Play Console(1회 $25) 등록
- **앱스토어**: Xcode → Product → Archive → App Store Connect 업로드 → 심사

## 폴더 구성

| 경로 | 내용 |
|---|---|
| `www/` | 앱 화면 (웹앱과 같은 코드) + `firebase-config.js` |
| `resources/` | 앱 아이콘 · 시작 화면 원본 (setup 때 모든 크기로 자동 생성) |
| `capacitor.config.json` | 앱 ID `kr.co.jdsol.jdtag`, 앱 이름, 시작 화면 · 상태바 설정 |
| `scripts/` | setup 자동화 (네이티브 프로젝트 생성 · 세로 고정) |
| `.github/workflows/` | GitHub에서 APK 자동 빌드 |

## 다음 단계로 할 수 있는 것

- **앱이 꺼져 있어도 오는 푸시 알림**: Firebase Cloud Messaging + 서버 함수(Firebase Blaze 요금제)가 필요해요
- **블루투스로 진짜 근처 기기 찾기 · NFC 명함 교환**
- **사운드 키 단말기 연동**: 출입 단말기 SDK 필요
