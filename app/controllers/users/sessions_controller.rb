class Users::SessionsController < Devise::SessionsController

  # GET /resource/sign_in
  def login_page
    if user_signed_in?
      redirect_to orders_order_list_path
    else
      render new
    end
  end

  def new
      super
  end

  # POST /resource/sign_in
  def create
    return invalid_login_attempt if params[:user].nil? || params[:user][:email].nil? || params[:user][:password].nil?
    resource = User.find_for_database_authentication(:email=>params[:user][:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in("user", resource)
      render :json=> {:success=>true, :email=>resource.email}
      return
    end
    invalid_login_attempt
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  # protected

  # You can put the params you want to permit in the empty array.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
  protected

  def invalid_login_attempt
    warden.custom_failure!
    render :json=> {:success=>false, :message=>"Ошибка в логине/пароле"}, :status=>201
  end
end
