# url-shortener

## Getting Started

### Clone

```zsh
git clone https://github.com/poiu694/url-shortener
cd url-shortener
```

### Install && Start

```zsh
cd server && npm install && npm dev &
cd ../web && npm install && npm dev &
```

Open 'http://localhost:5173'

## Point

### DB ERD

#### ShortenURL

base62 알고리즘을 통해 줄여진 해시값이다. 7자의 크기를 갖을 수 있게 패딩을 넣어주었다.

#### OriginalURL

ShortenURL에 들어가는 경우 리다이렉트할 URL이다.

#### id

id는 1부터 올라가면서 base62의 인코딩으로 들어가는 인풋이다.

### Base62 Encoding/Decoding

주소를 줄이는 해시 알고리즘을 id를 통한 base62 사용. base64를 가면 url-safe(+, /) 하지 않으므로 base62를 통해 url-safe하게 바꿀 수 있다. 다른 해시 알고리즘을 사용하게 된다면 8자 이내의 결과값을 만족하기 어렵다고 판단했다.

해당 알고리즘을 통해 나오는 결과 값은 62^7의 크기를 사용할 수 있다.

#### id를 base62로 인코딩을 하고 있다. 하나씩 늘리면서 사용하고 있는데, 이러면 다음의 주소가 예측가능한데 어떤식으로 만들면 좋을까?

처음에는 1 + random()되는 숫자를 생각해보긴 했으나 데이터의 양이 많을수록 id의 값이 너무 커질 수도 있다고 생각이 듦.

또한 random이 얼마나 커질 수 있는지에 따라 대용량으로 가면 갈수록, id를 저장할 수 있는 최대 크기에 빠르게 도달할 수도? autoIncrement를 제외하는 방법을 사용하게 된다면, 해싱 충돌을 막는 추가 연산을 넣어야 좋을 것 같다.

### Validate http address Regex

valid한 url을 확인하기 위해서 가볍게 http, https로 시작하는 등의 정규표현식을 거쳤다.

## Improvements

데이터가 많아졌을 경우에 대한 고려가 필요하다.(id, 성능 등)
