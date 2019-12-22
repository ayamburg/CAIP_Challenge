class PagesController < ApplicationController

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
