class User < ApplicationRecord
   attr_reader :password

   validates :username, :email, presence: true, uniqueness: true
   validates :password_digest, :session_token, presence: true
   validates :password, length: { minimum: 6 }, allow_nil: true

   after_initialize :ensure_session_token #, :ensure_user_image
   has_one_attached :photo
   has_many :authored_messages, 
      foreign_key: :author_id, 
      class_name: :Message, 
      dependent: :destroy

   has_many :server_memberships,
      foreign_key: :user_id,
      class_name: :ServerMember,
      dependent: :destroy

   has_many :servers,
      through: :server_memberships,
      source: :server

   has_many :server_messages,
      through: :servers,
      source: :messages
   has_many :channels,
      through: :servers,
      source: :channels
   def self.find_by_credentials(username, password)
      user = User.find_by(username: username)
      return nil unless user
      user.is_password?(password) ? user : nil
   end

   def password=(password) 
      @password = password
      self.password_digest = BCrypt::Password.create(password)
   end

   def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
   end

   def ensure_session_token 
      self.session_token ||= SecureRandom.urlsafe_base64
   end

   def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
   end
   
################################################################################

   def find_by_partial(partial_username)

   end

   # def ensure_user_image
   #    self.image
   # end
   # has_many :messages, foreign_key: :author_id
   # has_many :servers, foreign_key: :owner_id
end
