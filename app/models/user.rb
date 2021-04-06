class User < ApplicationRecord
   attr_reader :password

   validates :username, :email, presence: true, uniqueness: true
   validates :password_digest, :session_token, presence: true
   validates :password, length: { minimum: 6 }, allow_nil: true
   #user auth
   after_initialize :ensure_session_token, :ensure_user_image 
   #aws
   has_one_attached :photo
   #delete user messages on user delete
   has_many :authored_messages, 
      foreign_key: :author_id, 
      class_name: :Message, 
      dependent: :destroy
   #server associations
   has_many :server_memberships,
      foreign_key: :user_id,
      class_name: :ServerMember,
      dependent: :destroy

   has_many :servers,
      through: :server_memberships,
      source: :server
      
   has_many :owned_servers,
      class_name: :Server,
      foreign_key: :owner_id,
      dependent: :destroy

   has_many :channels,
      through: :servers,
      source: :channels

   # aquianted user associations
   has_many :server_members,
      through: :servers,
      source: :members
   
   has_many :friend_requests_as_requestor, 
      foreign_key: :requestor_id, 
      class_name: :FriendRequest,
      dependent: :destroy

   has_many :friend_requests_as_receiver, 
      foreign_key: :receiver_id, 
      class_name: :FriendRequest,
      dependent: :destroy

   has_many :friend_requestors,
      through: :friend_requests_as_receiver,
      source: :requestor
   
   has_many :friendship_as, 
      foreign_key: :friend_a_id,
      class_name:  :Friend,
      dependent: :destroy

   has_many :friend_as, 
      through: :friendship_as,
      source: :friend_b

   has_many :friendship_bs, 
      foreign_key: :friend_b_id,
      class_name:  :Friend,
      dependent: :destroy

   has_many :friend_bs, 
      through: :friendship_bs,
      source: :friend_a

   #message associations

   has_many :server_messages,
      through: :servers,
      source: :messages

   has_many :friend_a_messages,
      through: :friendship_as,
      source: :messages

   has_many :friend_b_messages,
      through: :friendship_bs,
      source: :messages
   #server invitation associations
   has_many :sent_server_invitations, 
      foreign_key: :sender_id, 
      class_name: :ServerInvitation, 
      dependent: :destroy

   has_many :received_server_invitations,
      foreign_key: :receiver_id,
      class_name: :ServerInvitation,
      dependent: :destroy
   has_many :invited_servers,
      through: :received_server_invitations,
      source: :server
   has_many :inviting_users,
      through: :received_server_invitations,
      source: :sender
      # User Auth
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
   def friends
      friend_as + friend_bs
   end

   def grab_users 
      users = self.server_members + self.friends + self.friend_requestors + self.inviting_users
      users.uniq!
   end
   # add server member ids before sending to front end
   def grab_servers
      servers = self.servers;
      sent_servers = servers.map do |server| 
         newServer = {}
         newServer[:id] = server[:id]
         newServer[:owner_id] = server[:owner_id]
         newServer[:image] = server[:image]
         newServer[:name] = server[:name]
         newServer[:members] = server.members.map { |member| member.id }
         if server.photo.attached?
            newServer[:photoUrl] = server.photo
         end
         newServer
      end
      sent_servers
   end
   def get_messages
      messages = {}
      messages[:channels] = self.server_messages
      messages[:friends] = self.friend_a_messages + self.friend_b_messages
      messages
   end

   def grab_server(server_id)
      server = Server.find(server_id)
      sent_server = {}
      sent_server[:id] = server[:id]
      sent_server[:owner_id] = server[:owner_id]
      sent_server[:image] = server[:image]
      sent_server[:name] = server[:name]
      sent_server[:members] = server.members.map { |member| member.id }
      if server.photo.attached?
         sent_server[:photoUrl] = server.photo
      end
      sent_server
   end
   # give users default icons 
   def ensure_user_image
      self.update(user_image: rand(0..3)) unless self.user_image
   end

   #grab relevant server invitation info

   def grab_server_invites #is this more efficient than doing db queries?
      invites = self.received_server_invitations
      invited_servers = self.invited_servers
      users = self.inviting_users
      parsed_invites = invites.map do |invite| 
         full_invite = {}
         full_invite[:id] = invite[:id]
         invited_servers.each do |invited_server|
            if invited_server[:id] = invite[:server_id]
               full_invite[:server] = invited_server
               break
            end
         end
         users.each do |user|
            if user[:id] = invite[:sender_id]
               full_invite[:sender] = user
               break
            end
         end
         full_invite
      end
      parsed_invites
   end
end
