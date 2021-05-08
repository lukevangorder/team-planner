class Event < ApplicationRecord
    
    belongs_to :user

    validates :name, length: {minimum: 3}, presence: true
    validates :info, length: {maximum: 500}, presence: true

    def day_of_week
        self.starts_at.strftime('%u').to_i;
    end

end
