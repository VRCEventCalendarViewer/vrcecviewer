const parseGenre = (genreValue: number) => {
  const genres = [
    {
      flag: 128,
      name: '初心者向け',
      color: '#666666',
    },
    {
      flag: 1,
      name: 'アバター試着会',
      color: '#660033',
    },
    {
      flag: 2,
      name: '改変アバター交流会',
      color: '#660033',
    },
    {
      flag: 8,
      name: 'VR飲み会',
      color: '#330066',
    },
    {
      flag: 16,
      name: '店舗系',
      color: '#336600',
    },
    {
      flag: 32,
      name: '音楽',
      color: '#006633',
    },
    {
      flag: 64,
      name: 'ロールプレイ',
      color: '#003366',
    },
    {
      flag: 4,
      name: 'その他交流会',
      color: 'black',
    },
    {
      flag: 256,
      name: '定期',
      color: 'black',
    },
  ]

  const result: any[] = []

  genres.forEach((genre) => {
    if ((genreValue & genre.flag) !== 0) {
      result.push(genre)
    }
  })

  return result
}

export default ({}, inject: any) => {
  inject('parse_genre', parseGenre)
}
