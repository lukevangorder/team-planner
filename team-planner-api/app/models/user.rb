class User < ApplicationRecord
    
    has_many :events
    has_many :days, through: :events

end
