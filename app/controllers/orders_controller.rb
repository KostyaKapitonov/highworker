class OrdersController < ApplicationController
  before_filter :is_user_signed_in?, except: [:preview, :add]

  def order_list
  end

  def all_orders
    render json: Order.all.order('created_at DESC').to_json
  end

  def preview
  end

  def add
    if request.get?
      return render :addOrder
    else
      if !show_captcha? || (check_captcha params[:recaptcha_token])
        permited = params.require(:order).permit(:name, :phone)
        p 'permited'
        new_order = Order.new(permited)
        new_order.is_new = true
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
    permited = params.require(:order).permit(:id, :is_new)
    order_to_update = Order.where(id: permited[:id]).first
    order_to_update.is_new = permited[:is_new]
    order_to_update.save
    render json: {success: true}
  end

  def delete
    Order.where(id: params[:id]).first.destroy
    render json: {success: true}
  end

  protected

  def is_user_signed_in?
    return redirect_to new_user_session_path unless user_signed_in?
  end

end
