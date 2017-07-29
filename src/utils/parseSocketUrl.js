import url from 'url';

export default function (socketUrl) {

  let {
  	pathname,
    query: {
      token
    }
  } = url.parse(socketUrl, true);

  if (!token) throw new Error('Malformed socket url, no token param provided');

  let split = pathname.split('/');

  if (split.length < 2) throw new Error('Malformed socket url path');

  return { token, lane: split[1] };

}
