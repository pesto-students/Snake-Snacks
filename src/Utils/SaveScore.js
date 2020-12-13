const URL = 'https://vast-castle-15150.herokuapp.com/api/score/add';

export default function SaveScore() {
  return (payload) => fetch(URL, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/JSON',
      authorization: localStorage.getItem('access_token'),
    },
  });
}
