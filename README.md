# Uniswap Swap Clone

[🇰🇷 KR Version Demo](https://uniswap-swap-clone.vercel.app?lng=ko-KR) [🇺🇸 EN Version Demo](https://uniswap-swap-clone.vercel.app?lng=en-US)

## 📌 프로젝트 개요

> Uniswap의 [Swap 페이지](https://app.uniswap.org/swap)의 프론트엔드 부분을 클론하여 구성한 프로젝트입니다. 주요 기능은 아래와 같습니다.

1. 유니스왑에서 지원하는 토큰에 대해서 스왑하려는 토큰(from)과 받으려는 토큰(to) 그리고 네트워크를 입력합니다.
2. 상대 토큰의 예상 교환 비율을 고정 비율로 확인할 수 있습니다.
3. 슬리피지 및 Uniswap 라우터와 관련된 기타 설정을 입력할 수 있습니다.
4. 지갑 연결이나 블록 상호작용에 관한 부분은 사전에 제시된 고정값`(ETH: 1,000$, WBTC: 10,000$, USDC: 1$)` 에 맞게 구성되어 있습니다. 실제로 온체인 상호작용은 일어나지 않습니다.

## 🛠 기술 스택

- **웹 프론트엔드** : TypeScript, Next.js(v15.1), React(v19)
- **상태 관리**: jotai, react-hook-form
- **블록체인 관련 유틸리티(체인 관련)**: Viem, @uniswap/default-token-list, @uniswap/token-lists
- **훅 테스트**: Jest, React Testing Library
- **Node version 및 패키지 매니저**: Node(v22.12.0), yarn(v1.22.22)

## 🧐 사전 기능 분석

- 작업 시작에 앞서 사전 요구사항 작성 정의는 노션으로 스펙을 정리하였습니다. [`➡️ 확인하러가기`](https://bustling-candytuft-91f.notion.site/BHarvest-Uniswap-swap-19d20ebeeb4544aabed8e3133e81d549)

- 피그마로 해피 케이스에 대한 유저 저니맵을 작성하였습니다. [`➡️ 확인하러가기`](https://www.figma.com/design/ayrb27VwhJ4S09G0p6mmR8/Uniswap-Clone?node-id=1-3)

## ⚡ 주요 기능

### 1. 토큰 페어 선택과 가격 계산

- 페이지에 진입한 뒤, `fromToken`과 `toToken`을 선택하면, **미리 정의된 가격데이터**를 기반으로 교환 비율을 제시합니다.
- 최초에 유저가 가지고 있는 재화는 `1 ETH`, `1 USDC`, `1 WBTC`입니다.
- 사용자의 from, to 입력에 따라 `useQuoting` 훅을 사용해 비율을 계산하여 반대쪽 값이 계산되어 업데이트됩니다.

### 2. 폼 부가 기능 처리.

- **from - to 변환 버튼**: 폼의 가운데 버튼을 클릭하면 입력된 토큰 정보와 수량에 해당하는 값이 바뀝니다.
- **from과 to가 같은 네트워크의 토큰을 가질 때 처리**: from과 to를 바꾸도록 구성하였습니다.
- **지갑 연결**: boolean 플래그로 처리되어 있습니다. 헤더 우측 상단에서 토글 가능합니다.
- **최대 재화 계산**: `useBalance` 훅을 통해 지갑에 담긴 최대 재화 크기를 확인하고 클릭시 from 수량을 최대 재화로 설정합니다.
- **가격 조회 시 딜레이 처리(debounce)**: 사용자가 입력한 `fromAmount` 값이 변경될 때마다 일정 시간 후 비율을 계산하여 반영합니다. 원본 페이지에서는 일정 시간마다 스왑 비율이 변경되는지 확인해서 새로 fetch해오는 로직이 있어 debounce 로직을 처리해두었습니다.

### 3. jotai로 설계한 wagmi-like React Hook

- Wagmi와 같이 사용할 수 있는 구현에 필요한 훅들을 설계하엿습니다.
- 지갑 연결, 연결 해제, 활성화된 체인Id, 활성화된 계정 등 정보를 jotai를 통해 관리하고 훅으로 사용합니다.

### 4. 다국어 지원

- 영어(en-US)와 한글(ko-KR)에 대해 두 가지 언어를 제공합니다.
- `dictionaries` 폴더에 정의된 각 json 파일들과 `useDictionary` 훅을 사용하여 전환할 수 있습니다.
- useSearchParams에 lng 파라미터를 통해 전환 가능합니다.

## 🚀 코드 실행 방법

### 1. 프로젝트 클론 및 패키지 설치

```bash
git clone https://github.com/howdyfrom2019/uniswap-swap-clone.git
cd [설치경로]
yarn install # or npm install
```

### 2. 개발 서버 실행

```bash
yarn dev # or npm run dev
```

### 3. 로컬 확인

```bash
http://localhost:3000 # or 터미널에 떠있는 다른 포트의 주소
```

## 🧪 테스트 실행

### 1. 유닛 테스트 실행

```bash
yarn test # or npm run test
```

### 2. 특정 테스트 실행

```bash
yarn test [원하는 파일].test.{ts|tsx} # eg. yarn test use-quoting.test.tsx
```

## 마무리

프론트엔드 측면에서 Uniswap의 핵심기능을 이해하고 프론트엔드 기술로써 구현해내는데 초점을 맞추었습니다.
