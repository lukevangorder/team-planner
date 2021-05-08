class Event < ApplicationRecord
    
    belongs_to :user

    def day_of_week
        self.starts_at.strftime('%u').to_i;
    end

end
