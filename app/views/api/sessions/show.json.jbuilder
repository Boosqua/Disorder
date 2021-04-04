json.extract! @user, :id, :username, :email, :user_image
if @user.photo.attached? && !params[:user][:delete_photo]
   json.photo url_for(@user.photo)
end