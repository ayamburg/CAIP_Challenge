class PagesController < ApplicationController
  def show
    _ids = search('rails')[:items].collect{ |i| i[:id][:videoId] }
    @videos = get_full_details(_ids)
  end

  def search(query)
    yt = YoutubeInteractor.new(query, [])
    yt.search.deep_symbolize_keys
  end

  def get_full_details(ids)
    yt = YoutubeInteractor.new('', ids)
    yt.get_details
  end

  def videos
    _ids = search(params['query'])[:items].collect{ |i| i[:id][:videoId] }
    render json: get_full_details(_ids)
  end
end
