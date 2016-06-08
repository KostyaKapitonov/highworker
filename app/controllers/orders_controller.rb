class OrdersController < ApplicationController

  def order_list
    render json: Order.all.to_json
  end

  def preview

  end

  def addOrder
    if request.get?
      return render :addOrder
    else
      if !show_captcha? || (check_captcha params[:recaptcha_token])
        permited = params.require(:order).permit(:name, :phone)
        p 'permited'
        new_order = Order.new(permited)
        if new_order.valid?
          new_order.save!
          render json: {success: true}
        else
          render json: {success: false, errors: new_order.errors}
        end
      else
        render json: {success: false, errors: ['captcha failed']}
      end
    end


  end

  def update

  end

  def delOrder
  end

  protected

  def checkCaptcha

  end

end
