class YoutubeInteractor

  KEY = ENV['YOUTUBE_KEY']
  BASE_URI = 'https://www.googleapis.com/youtube/v3/'.freeze

  def initialize(query = '', ids = [])
    @q = query
    @ids = ids
  end

  def fields
    'snippet, statistics'
  end

  def search
    _url = "#{BASE_URI}search?part=snippet&maxResults=5&type=video&key=#{KEY}&q=#{@q}"
    res = HTTParty.get(_url).body
    JSON.parse(res)
  end

  def get_details
    _url = "#{BASE_URI}videos?part=#{fields}&key=#{KEY}&id=#{@ids.join(',')}"
    res = HTTParty.get(_url).body
    JSON.parse(res)
  end
end
