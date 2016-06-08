class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception





  def check_captcha(val)
    res = get_request('https://www.google.com/recaptcha/api/siteverify', ENV['RECAPTCHA_KEY'], val.to_s)
    res && res.body && JSON.parse(res.body)['success'] === true
  end

  private

  def get_xml_resp_as_hash(url)
    url = URI.parse(url)
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    Hash.from_xml(res.body)
  end

  def get_request(url, app_key, response)
    Net::HTTP.post_form URI.parse(url), { secret: app_key, response: response }
  end
end
