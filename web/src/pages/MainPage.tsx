import { useState } from 'react';
import { api } from '../api/api';
import useLocalStorage from '../hooks/useLocalStorage';

interface ShortURL {
  id: number;
  originalUrl: string;
  shortenUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

function MainPage() {
  const [url, setUrl] = useState<string>('');
  const [shortUrls, setShortUrls] = useLocalStorage<ShortURL[]>('urls', []);
  const [datas, setDatas] = useState<string[]>([]);

  const onSubmitUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^(http|https):/.test(url)) {
      alert('유효하지 않은 주소입니다.');
      return;
    }
    const existUrl = shortUrls.find((shortUrl) => shortUrl.originalUrl === url);
    if (existUrl) {
      alert('이미 단축되어있습니다.');
      return;
    }
    try {
      const res = await api.post('/api/short-url', {
        url,
      });
      alert(res.data.msg);
      setShortUrls((prev) => [...prev, res.data.url]);
      setUrl('');
    } catch (err) {
      alert('문제가 생겼습니다.');
    }
  };

  const onSubmit = async () => {
    try {
      const res = await api.get('/api/images');
      setDatas(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main>
        <h1>URL Shortener</h1>
        <form onSubmit={onSubmitUrl} style={{ display: 'flex', gap: '4px' }}>
          <span>ORIGINAL URL</span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="submit" aria-label="submit url">
            SHORT
          </button>
        </form>
        <button type="submit" onClick={onSubmit}>
          이미지 처리
        </button>
        <ul>
          <table style={{ width: '100%', textAlign: 'center' }}>
            <thead>
              <td>INDEX</td>
              <td>SHORTEN</td>
              <td>ORIGINAL</td>
            </thead>
            {shortUrls.map((shortUrl, index) => (
              <tr key={shortUrl.id}>
                <td>{index + 1}.</td>
                <td>
                  <a href={shortUrl.originalUrl} target="_blank" style={{ marginInline: 320 }}>
                    http://localhost:5173/{shortUrl.shortenUrl}
                  </a>
                </td>
                <td>{shortUrl.originalUrl}</td>
              </tr>
            ))}
          </table>
        </ul>
        <ul>
          <table style={{ width: '100%', textAlign: 'center' }}>
            <thead>
              <td>INDEX</td>
              <td>SHORTEN</td>
            </thead>
            {datas.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{data}</td>
              </tr>
            ))}
          </table>
        </ul>
      </main>
    </>
  );
}

export default MainPage;
