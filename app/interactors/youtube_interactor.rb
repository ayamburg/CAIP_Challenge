class YoutubeInteractor

  KEY = 'AIzaSyD2pJdbsV7JZUzE9ubq8W9l5M8MHumwFjM'
  BASE_URI = 'https://www.googleapis.com/youtube/v3/'.freeze

  def initialize(query = '', ids = [])
    @q = query
    @ids = ids
  end

  def fields
    'snippet, statistics'
  end

  def get_details
    _url = "#{BASE_URI}videos?part=#{fields}&key=#{KEY}&id=#{@ids.join(',')}"
    res = HTTParty.get(_url).body
    JSON.parse(res)
  end
end
