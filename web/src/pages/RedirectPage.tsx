import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
// import { api } from '../api/api';

function RedirectPage() {
  const params = useParams();

  useLayoutEffect(() => {
    (async () => {
      const { url } = params;
      if (url) {
        try {
          const res = await api.get(`/api/route/${url}`);
          if (res.status === 200) {
            alert(res.data.originalUrl + '로 이동합니다.');
            window.location.href = res.data.originalUrl;
          }
        } catch (err) {
          alert('유효하지 않은 주소입니다.');
        }
      }
    })();
  }, [params]);

  return 'a';
}

export default RedirectPage;
